<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\Post;
use App\Models\Story;
use App\Models\User;
use App\Models\Comment;
use App\Models\Video;
use App\Models\Commentv;

class HomeController extends Controller
{
    public function createPost(Request $request){

        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            'file' => 'file|max:409600',
            'content' => 'required|string|min:20|max:1000'
        ], [
            'file.file' => 'Fișier invalid',
            'file.max' => 'Mărimea depășește 400 MB',
            'content.required' => 'Conținutul este necesar.',
            'content.string' => 'Conținutul trebuie să fie un text valid.',
            'content.max' => 'Conținutul nu poate depăși 1000 de caractere.',
            'content.min' => 'Conținutul trebuie să conțină cel puțin 20 caractere.'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $file = null;
        if ($request->file('file')){
            $file = $request->file('file');

            $mimeType = $file->getMimeType();

            if (strpos($mimeType, 'image/') !== 0 && strpos($mimeType, 'video/') !== 0) {
                return response()->json(['errors' => 'Fișierul trebuie să fie o imagine sau un video'], 422);
            }

            $uploadFolder = 'postFiles';
            $image = $request->file('file');
            $image_uploaded_path = $image->store($uploadFolder, 'public');
            $file = str_replace('localhost','127.0.0.1:8000',Storage::disk('public')->url($image_uploaded_path));
        }
        $uuid = Str::uuid()->toString();

        $post = Post::create([
            'user_id' => $user->id,
            'uuid' => $uuid,
            'body' => $request->input('content'),
            'file' => $file
        ]);


        return response()->json([
            'success' => true,
            'post' => $post
        ]);
    }

    public function editPost($id, Request $request){

        $post = Post::where('uuid',$id)->first();

        if ($request->input('content') != null || $request->input('content') != ''){
            $post->body = $request->input('content');
        }

        if ($request->file('file')){
            $file = $request->file('file');
            $mimeType = $file->getMimeType();

            if (strpos($mimeType, 'image/') !== 0 && strpos($mimeType, 'video/') !== 0) {
                return response()->json(['errors' => 'Fișierul trebuie să fie o imagine sau un video'], 422);
            }

            $fileUrl = $post->file;

            $filename = basename($fileUrl);

            $storagePath = 'postFiles/' . $filename;
            if (Storage::disk('public')->exists($storagePath)) {
                Storage::disk('public')->delete($storagePath);  
            }
            $uploadFolder = 'postFiles';
            $image = $request->file('file');
            $image_uploaded_path = $image->store($uploadFolder, 'public');
            $file = str_replace('localhost','127.0.0.1:8000',Storage::disk('public')->url($image_uploaded_path));
            $post->file = $file;
        }

        $post->save();

        return response()->json($post);
    }

    public function getPost($id, Request $request){
        $currentUserId = Auth::id();

        // Retrieve the post by UUID
        $post = Post::with(['user.profile:id,user_id,profile_photo,first_name,last_name'])
                    ->where('uuid', $id)
                    ->firstOrFail(); // This will throw a 404 if not found

        // Attach additional data to the post
        $post->liked_by_user = $post->likes()->where('user_id', $currentUserId)->exists();
        $post->like_count = $post->likes()->count();
        $post->nr_of_comments = $post->comments()->count();

        // Return the post as a JSON response
        return response()->json($post);
    }

    public function deletePost($id, Request $request){
        
        $post = Post::where('uuid',$id)->first();

        if ($post->file != null || $post->file != ''){
            $fileUrl = $post->file;

            $filename = basename($fileUrl);

            $storagePath = 'postFiles/' . $filename;
            if (Storage::disk('public')->exists($storagePath)) {
                Storage::disk('public')->delete($storagePath);  
            }
        }

        $post->delete();

        return response('deleted post with id'.$id);
    }

    public function showContent(){
        $currentUserId = Auth::id();

        $posts = Post::with(['user.profile:id,user_id,profile_photo,first_name,last_name'])->get();

        $posts->transform(function ($post) use ($currentUserId) {
            $post->liked_by_user = $post->likes()->where('user_id', $currentUserId)->exists();
            $post->like_count = $post->likes()->count();
            $post->nr_of_comments = $post->comments()->count();
            return $post;
        });

        return response()->json($posts);
    }


    public function writeComment($id, Request $request){

        $request->validate([
            'content' => 'required|string|min:1|max:1000'
        ], [
            'content.required' => 'Conținutul comentariului este necesar.',
            'content.string' => 'Comentariului trebuie să fie un text valid.',
            'content.min' => 'Comentariului trebuie să conțină cel puțin 1 caracter.',
            'content.max' => 'Comentariului nu poate depăși 1000 de caractere.'
        ]);

        $post = Post::where('uuid',$id)->first();
        $user = Auth::user();

        $comment = Comment::create([
            'user_id' => $user->id,
            'post_id' => $post->id,
            'content' => $request->input('content')
        ]);

        $comment->load(['user', 'user.profile']);

        return response()->json($comment);     

    }

    public function getComments($id, Request $request){

        $post = Post::where('uuid',$id)->first();
        $comments = $post->comments()->with(['user', 'user.profile'])->get();
        return response()->json($comments);
    }


    public function deleteComment($id, Request $request){
        $comment = Comment::find($id);
        $comment->delete();
        return response('success'.$id);
    }

    public function likePost($id, Request $request){
        $post = Post::where('uuid',$id)->first();
        $user = Auth::user();
        if (!$post->likes()->where('user_id', $user->id)->exists()) {
            $post->likes()->attach($user->id);
            return response()->json([
                'msg' => 'Liked',
                'nr' => $post->likes()->count()
            ]);
        } else {
            $post->likes()->detach($user->id);
            return response()->json([
                'msg' => 'Disliked',
                'nr' => $post->likes()->count()
            ]);
        }
        return response()->json($post->likes);
    }


    public function getLikes($id, Request $request){
        $post = Post::where('uuid',$id)->first();
        $usersWhoLiked = $post->likes()->with('profile:id,user_id,profile_photo,first_name,last_name')->get();

        $result = $usersWhoLiked->map(function ($user) {
            return [
                'idKey' => $user->idKey,
                'profile_photo' => $user->profile->profile_photo,
                'first_name' => $user->profile->first_name,
                'last_name' => $user->profile->last_name
            ];
        });

        return response()->json($result);
    }

    public function createShort(Request $request){

        $user = Auth::user();

        $validator = Validator::make($request->all(), [
            'file' => 'file|max:409600',
            'content' => 'required|string|min:20|max:1000'
        ], [
            'file.file' => 'Fișier invalid',
            'file.max' => 'Mărimea depășește 400 MB',
            'content.required' => 'Conținutul este necesar.',
            'content.string' => 'Conținutul trebuie să fie un text valid.',
            'content.max' => 'Conținutul nu poate depăși 1000 de caractere.',
            'content.min' => 'Conținutul trebuie să conțină cel puțin 20 caractere.'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $file = null;
        if ($request->file('file')){
            $file = $request->file('file');

            $mimeType = $file->getMimeType();

            if (strpos($mimeType, 'video/') !== 0) {
                return response()->json(['errors' => 'Fișierul trebuie să fie un video'], 422);
            }

            $uploadFolder = 'shortVideoFiles';
            $image = $request->file('file');
            $image_uploaded_path = $image->store($uploadFolder, 'public');
            $file = str_replace('localhost','127.0.0.1:8000',Storage::disk('public')->url($image_uploaded_path));
        }
        $uuid = Str::uuid()->toString();

        $video = Video::create([
            'user_id' => $user->id,
            'uuid' => $uuid,
            'body' => $request->input('content'),
            'file' => $file
        ]);


        return response()->json([
            'success' => true,
            'video' => $video
        ]);

    }


    public function createStory(Request $request){


        $user = Auth::user();

        if ($user->stories()->count() > 0){
            return "Deja ai un story";
        }

        $validator = Validator::make($request->all(), [
            'file' => 'required|mimes:mp4|max:51200'
        ], [
            'file.file' => 'Fișier invalid',
            'file.max' => 'Mărimea depășește 50 MB'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $file = null;
        if ($request->file('file')){
            $file = $request->file('file');

            $mimeType = $file->getMimeType();

            if (strpos($mimeType, 'video/') !== 0) {
                return response()->json(['errors' => 'Fișierul trebuie să fie un video'], 422);
            }

            $uploadFolder = 'storyFiles';
            $image = $request->file('file');
            $image_uploaded_path = $image->store($uploadFolder, 'public');
            $file = str_replace('localhost','127.0.0.1:8000',Storage::disk('public')->url($image_uploaded_path));
        }
        $uuid = Str::uuid()->toString();

        $story = Story::create([
            'user_id' => $user->id,
            'uuid' => $uuid,
            'file' => $file
        ]);


        return response()->json([
            'success' => true,
            'story' => $story
        ]);
    }



    public function showStories(){
        $user = Auth::user();

        $mutualFollowers = User::whereHas('followers', function ($query) use ($user) {
            $query->where('follower_id', $user->id);
        })->whereHas('following', function ($query) use ($user) {
            $query->where('followed_id', $user->id);
        })->with('profile')
          ->get();


        $stories = collect();

    
        $userFirstStory = $user->stories()->with('user.profile')->first();
        if ($userFirstStory) {
            $stories->push($userFirstStory->load(['user', 'user.profile']));
        }

        foreach ($mutualFollowers as $follower) {
            $firstStory = $follower->stories()->with('user.profile')->first();
            if ($firstStory) {
                $stories->push($firstStory->load(['user', 'user.profile']));
            }
        }

        return response()->json($stories);
    }

    public function deleteStory($id, Request $request){
        $story = Story::where('uuid',$id)->first();

        if ($story->file != null || $story->file != ''){
            $fileUrl = $story->file;

            $filename = basename($fileUrl);

            $storagePath = 'storyFiles/' . $filename;
            if (Storage::disk('public')->exists($storagePath)) {
                Storage::disk('public')->delete($storagePath);  
            }
        }

        $story->delete();

        return response('deleted story with id'.$id);
    }
    

}
