<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Message;
use App\Events\MessageSend;
use App\Models\Profile;
use App\Models\Notification;
use App\Events\NotificationSend;

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

    public function deleteMessageById($id)
    {
        $message = Message::find($id);

        if (!$message) {
            return response()->json(['error' => 'Mesajul nu a fost găsit.'], 404);
        }
        $message->delete();

        return response()->json('Mesajul a fost șters cu succes!');
    }

    public function sendMessage(Request $request)
    {
        $request->validate([
            'receiver_id' => 'required|exists:users,id',
            'message' => 'string',
            'type' => 'required|string',
            'postId' => 'string',
            'shortId' => 'string'
        ]);

        $message = new Message();
        $message->sender_id = Auth::id();
        $message->receiver_id = $request->receiver_id;
        if ($request->input('type') == 'text'){
            $message->message = $request->message;
        }else if ($request->input('type') == 'post'){
            $message->link = $request->input('postId');
        }else if ($request->input('type') == 'short'){
            $message->link = $request->input('shortId');
        }
        
        $message->type = $request->input('type');

        $message->save();

        $notification = Notification::create([
            'user_id' => $request->receiver_id,
            'type' => 'message',
            'idOfUser' => Auth::id(),
            'title' => 'Mesaj Nou ',
            'desc' => 'De la ' . Auth::user()->profile->first_name . ' ' . Auth::user()->profile->last_name,
            'photo' => Auth::user()->profile->profile_photo,
            'read' => false,
        ]);

        error_log($notification);

        event(new MessageSend($message));
        event(new NotificationSend($notification));

        return response()->json($message);
    }

    public function searchFriends($query){

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
        ->with('profile')
        ->get();

        return response()->json($mutualFollowers);
    }

}
