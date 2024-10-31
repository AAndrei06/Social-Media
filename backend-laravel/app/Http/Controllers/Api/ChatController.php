<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Message;
use App\Events\MessageSend;
use App\Models\Profile;

class ChatController extends Controller
{
    public function getChat(){
        $user = Auth::user();

        $mutualFollowers = User::whereHas('followers', function ($query) use ($user) {
            $query->where('follower_id', $user->id);
        })->whereHas('following', function ($query) use ($user) {
            $query->where('followed_id', $user->id);
        })->with('profile')
          ->get();

        return response()->json([
            'mutual_followers' => $mutualFollowers
        ]);
    }

    public function getMessages($otherUserId, Request $request)
    {
        $currentUserId = Auth::id();

        error_log($currentUserId .' '. $otherUserId);
        $messages = Message::where(function ($query) use ($currentUserId, $otherUserId) {
            $query->where('sender_id', $currentUserId)
                ->where('receiver_id', $otherUserId);
        })->orWhere(function ($query) use ($currentUserId, $otherUserId) {
            $query->where('sender_id', $otherUserId)
                ->where('receiver_id', $currentUserId);
        })->orderBy('created_at', 'asc')->get();
        
        $messages = $messages->map(function ($message) use ($currentUserId) {
            $message->is_sender = $message->sender_id == $currentUserId;
            return $message;
        });

        $otherUser = User::with('profile')->find($otherUserId);

        if (!$otherUser) {
            return response()->json(['error' => 'User not found'], 404);
        }

        return response()->json([
            'messages' => $messages,
            'otherUser' => $otherUser
        ]);

    }

    public function sendMessage(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'message' => 'string',
            'type' => 'required|string',
            'postId' => 'string'
        ]);

        $message = new Message();
        $message->sender_id = Auth::id();
        $message->receiver_id = $request->receiver_id;
        if ($request->input('type') == 'text'){
            $message->message = $request->message;
        }else if ($request->input('type') == 'post'){
            $message->link = $request->input('postId');
        }
        
        $message->type = $request->input('type');

        $message->save();

        event(new MessageSend($message)); // Dispatchează evenimentul

        return response()->json($message);
    }

    public function searchFriends($query){
        /*
        $profiles = Profile::where('first_name', 'LIKE', '%' . $query . '%')
        ->orWhere('last_name', 'LIKE', '%' . $query . '%')
        ->with('user') // Eager load the associated user
        ->get()
        ->map(function ($profile) {
            return [
                'user' => $profile->user, // Return user object
                'profile' => $profile, // Include profile information
            ];
        });

        return response()->json($profiles);*/
        $user = Auth::user();
        $mutualFollowers = User::whereHas('followers', function ($q) use ($user) {
            $q->where('follower_id', $user->id);
        })
        ->whereHas('following', function ($q) use ($user) {
            $q->where('followed_id', $user->id);
        })
        ->whereHas('profile', function ($q) use ($query) {
            $q->where('first_name', 'LIKE', '%' . $query . '%')
              ->orWhere('last_name', 'LIKE', '%' . $query . '%');
        })
        ->with('profile') // Încarcă profilul asociat pentru fiecare utilizator
        ->get();

        return response()->json($mutualFollowers);
    }




/*
    public function sendMessage(Request $request)
    {
        
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'message' => 'required|string',
            'file' => 'nullable|file', // In case you want to handle file attachments
        ]);
        
        $message = new Message();
        $message->sender_id = Auth::id();
        $message->receiver_id = $request->receiver_id;
        $message->message = $request->message;
        $message->type = "text";


        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $path = $file->store('messages_files');
            $message->file = $path;
        }


        $message->save();

        event(new MessageSend($message));

        return response()->json($message);
    }
    */
}
