<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\Video;
use App\Models\Commentv;

class ShortVideoController extends Controller
{
    public function showVideos(){
        $currentUserId = Auth::id();

        $videos = Video::with(['user.profile:id,user_id,profile_photo,first_name,last_name'])->get();
        
        $videos->transform(function ($video) use ($currentUserId) {
            $video->liked_by_user = $video->likes()->where('user_id', $currentUserId)->exists();
            $video->like_count = $video->likes()->count();
            $video->nr_of_comments = $video->comments()->count();
            return $video;
        });

        return response()->json($videos);
    }

    public function likeVideo($id, Request $request){
        $video = Video::where('uuid',$id)->first();
        $user = Auth::user();

        if (!$video->likes()->where('user_id', $user->id)->exists()) {
            $video->likes()->attach($user->id);
            return response()->json([
                'msg' => 'Liked',
                'nr' => $video->likes()->count()
            ]);
        } else {
            $video->likes()->detach($user->id);
            return response()->json([
                'msg' => 'Disliked',
                'nr' => $video->likes()->count()
            ]);
        }
        return response()->json($video->likes);
    }


    public function deleteVideo($id, Request $request){
        $video = Video::where('uuid',$id)->first();

        if ($video->file != null || $video->file != ''){
            $fileUrl = $video->file;

            $filename = basename($fileUrl);

            $storagePath = 'shortVideoFiles/' . $filename;
            if (Storage::disk('public')->exists($storagePath)) {
                Storage::disk('public')->delete($storagePath);  
            }
        }

        $video->delete();

        return response('deleted video with id'.$id);
    }

    public function commentVideo($id, Request $request){

        $video = Video::where('uuid',$id)->first();
        $user = Auth::user();

        $commentv = Commentv::create([
            'user_id' => $user->id,
            'video_id' => $video->id,
            'content' => $request->input('content')
        ]);
        
        $commentv->load(['user', 'user.profile']);

        return response()->json($commentv);
    }

    public function getCommentsVideo($id, Request $request){

        $video = Video::where('uuid',$id)->first();
        $comments = $video->comments()->with(['user', 'user.profile'])->get();
        return response()->json($comments);
    }

    public function deleteCommentVideo($id, Request $request){
        $comment = Commentv::find($id);
        $comment->delete();
        return response('success'.$id);
    }
}
