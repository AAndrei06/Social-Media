<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Notification;
use App\Events\NotificationSend;

class ProfileController extends Controller
{
    public function profileGet($id, Request $request){
        $current = Auth::user();
        $user = User::where('idKey', $id)->first();
        $profile = $user->profile;

        $followersCount = $user->followers()->count();
        $followingCount = $user->following()->count();

        $isFollowing = $user->followers()->where('follower_id', $current->id)->exists();

        $profile->followers_count = $followersCount;
        $profile->following_count = $followingCount;
        $profile->is_following = $isFollowing;

        return response()->json(array(
            'profile' => $profile,
            'user' => $user
        ));
    }

    public function profilePost($id, Request $request){

        $user = Auth::user();
        $profile = $user->profile;

        if ($request->header('Action-Of-Profile') == 'bannerPhotoChange'){

            $request->validate([
                'file' => 'image|mimes:jpeg,png,jpg,gif'
            ],[
                'file.image' => 'Fișierul trebuie să fie o imagine',
                'file.mimes' => 'Imaginea nu e de format jpeg,png,jpg sau gif'
            ]);
            $uploadFolder = 'profilesPhotos';
            $image = $request->file('file');
            $image_uploaded_path = $image->store($uploadFolder, 'public');
            $profile->back_photo = str_replace('localhost','127.0.0.1:8000',Storage::disk('public')->url($image_uploaded_path));
            $profile->save();
            $uploadedImageResponse = array(
                "image_name" => basename($image_uploaded_path),
                "image_url" => str_replace('localhost','127.0.0.1:8000',Storage::disk('public')->url($image_uploaded_path)),
                "mime" => $image->getClientMimeType()
            );
            return response(['message' => 'Fișier încărcat cu succes',
                             'status' => 'success',
                             'code' => 200,
                             'fileLink' => $uploadedImageResponse]);

        }else if ($request->header('Action-Of-Profile') == 'profilePhotoChange'){

            $request->validate([
                'file' => 'image|mimes:jpeg,png,jpg,gif'
            ],[
                'file.image' => 'Fișierul trebuie să fie o imagine',
                'file.mimes' => 'Imaginea nu e de format jpeg,png,jpg sau gif'
            ]);
            $uploadFolder = 'profilesPhotos';
            $image = $request->file('file');
            $image_uploaded_path = $image->store($uploadFolder, 'public');
            $profile->profile_photo = str_replace('localhost','127.0.0.1:8000',Storage::disk('public')->url($image_uploaded_path));
            $profile->save();
            
            $uploadedImageResponse = array(
                "image_name" => basename($image_uploaded_path),
                "image_url" => str_replace('localhost','127.0.0.1:8000',Storage::disk('public')->url($image_uploaded_path)),
                "mime" => $image->getClientMimeType()
            );
            return response(['message' => 'Fișier încărcat cu succes',
                             'status' => 'success',
                             'code' => 200,
                             'fileLink' => $uploadedImageResponse]);
        }else if ($request->header('Action-Of-Profile') == 'updateInfo'){
            
            $profile->occupation = $request['occupation'];
            $profile->location = $request['location'];
            $profile->person = $request['person'];
            $profile->education = $request['education'];
            $profile->save();

            return response()->json(array(
                'occupation' => $profile->occupation,
                'location' => $profile->location,
                'person' => $profile->person,
                'education' => $profile->education
            ));

        }else if ($request->header('Action-Of-Profile') == 'updateResume'){

            $profile->resume = $request['resume'];
            $profile->save();
            return response($profile->resume);
        }

    }



    public function follow($id, Request $request){

        $currentUser = Auth::user();
        $toFollow = User::where('idKey',$id)->first();

        $isFollowing = $toFollow->followers()->toggle($currentUser->id);
        if ($isFollowing['attached']) {
            // Create a notification for the followed user
            $notification = Notification::create([
                'user_id' => $toFollow->id,
                'type' => 'follow',
                'link' => 'profile/' . $currentUser->idKey,
                'idOfUser' => $currentUser->id,
                'title' => $currentUser->profile->first_name . ' ' . $currentUser->profile->last_name,
                'desc' => 'A început să te urmărească',
                'photo' => $currentUser->profile->profile_photo,
                'read' => false
            ]);

            event(new NotificationSend($notification));
        }

        

        return response([
            'id' => $id,
            'follows' => $request->input('followId'),
            'followers1' => $toFollow->followers()->get(),
            'follows1' => $toFollow->following()->get(),
            'followers2' => $currentUser->followers()->get(),
            'follows2' => $currentUser->following()->get()
        ]);
    }


}
