<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function profileGet($id, Request $request){
        
        $user = Auth::user();
        $profile = $user->profile;
        return response()->json(array(
            'profile' => $profile,
            'user' => $user
        ));
    }

    public function profilePost($id, Request $request){

        if ($request->header('Action-Of-Profile') == 'bannerPhotoChange'){
            $user = Auth::user();
            $profile = $user->profile;

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
            $user = Auth::user();
            $profile = $user->profile;

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
        }




    }

}
