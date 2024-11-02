<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use App\Models\Profile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use App\Models\Notification;

class AuthController extends Controller
{
    public function signup(SignupRequest $request){
        $data = $request->validated();

        $uuid = Str::uuid()->toString();
        
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
            'idKey' => $uuid
        ]);

        Profile::create([
            'first_name'=>$data['surname'],
            'last_name'=>$data['name'],
            'birth_date'=>$data['date'],
            'gender'=>$data['gender'],
            'user_id'=>$user->id,
            'resume'=>''
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user','token'));

    }

    public function login(LoginRequest $request){

        $credentials = $request->validated();

        if (!Auth::attempt($credentials)){
            return response(
                ['message' => "Credențiale Invalide"]
            );
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user','token'));

    }

    public function logout(Request $request){
        $user = $request->user();
        $user->currentAccessToken->delete();
        return response('',204);
    }

    public function getUser(Request $request){
        $user = $request->user;
        return response()->json($user);
    }

    public function getNotifications(){
        $user = Auth::user();
        $notifications = $user->notifications()->orderBy('created_at', 'desc')->get();
        return response()->json($notifications);
    }

    public function deleteNotification($id)
    {

        $notification = Notification::find($id);

        if (!$notification) {
            return response()->json(['message' => 'Notification not found.'], 404);
        }

        if ($notification->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized action.'], 403);
        }

        $notification->delete();

        return response()->json(['message' => 'Notification deleted successfully.']);
    }


}
