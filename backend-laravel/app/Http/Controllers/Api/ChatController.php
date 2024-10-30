<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Message;
//use App\Events\MessageSend;

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
        /*
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'message' => 'required|string',
            'file' => 'nullable|file', // In case you want to handle file attachments
        ]);
        */
        $message = new Message();
        $message->sender_id = Auth::id();
        $message->receiver_id = $request->receiver_id;
        $message->message = $request->message;
        $message->type = "text";

/*
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $path = $file->store('messages_files');
            $message->file = $path;
        }
*/

        $message->save();

        //event(new MessageSend($message));

        return response()->json($message);
    }
}
