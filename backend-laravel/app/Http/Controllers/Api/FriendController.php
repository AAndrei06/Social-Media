<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class FriendController extends Controller
{
    public function getFriends(){


        $user = Auth::user();

        // Get mutual followers
        $mutualFollowers = User::whereHas('followers', function ($query) use ($user) {
            $query->where('follower_id', $user->id);
        })->whereHas('following', function ($query) use ($user) {
            $query->where('followed_id', $user->id);
        })->with('profile')
          ->get();

        // Get current user's followers and following
        $myFollowers = $user->followers()->pluck('follower_id');
        $myFollowing = $user->following()->pluck('followed_id');

        // Merge followers and following
        $myFollowersAndFollowing = $myFollowers->merge($myFollowing);

        // Get followers of followers
        $followersOfFollowers = User::whereIn('id', $myFollowers)
            ->with(['followers' => function ($query) use ($myFollowersAndFollowing, $user) {
                $query->whereNotIn('follower_id', $myFollowersAndFollowing)
                      ->where('follower_id', '!=', $user->id);
            }])
            ->get()
            ->flatMap(function ($follower) {
                return $follower->followers->pluck('id');
            });

        // Get new followers excluding those already followed or following
        $newFollowers = $followersOfFollowers->diff($myFollowersAndFollowing)->filter(function ($followerId) use ($user) {
            return $followerId != $user->id;
        });

        // Fetch data for new followers
        $newFollowersData = User::whereIn('id', $newFollowers)->with('profile')->get();

        // Get suggested followers who follow me but I don't follow back
        $suggestedFollowers = User::whereIn('id', $myFollowers)
            ->whereNotIn('id', $myFollowing)
            ->where('id', '!=', $user->id)
            ->with('profile')
            ->get();

        // Merge new followers and suggested followers
        $suggestions = $newFollowersData->merge($suggestedFollowers);

        // Return response with mutual followers and suggestions
        return response()->json([
            'mutual_followers' => $mutualFollowers,
            'suggestions' => $suggestions
        ]);




        /*
        $user = Auth::user();

        $mutualFollowers = User::whereHas('followers', function ($query) use ($user) {
            $query->where('follower_id', $user->id);
        })->whereHas('following', function ($query) use ($user) {
            $query->where('followed_id', $user->id);
        })->with('profile')
          ->get();

        $myFollowers = $user->followers()->pluck('follower_id');

        $myFollowing = $user->following()->pluck('followed_id');

        $myFollowersAndFollowing = $myFollowers->merge($myFollowing);

        $followersOfFollowers = User::whereIn('id', $myFollowers)
            ->with(['followers' => function ($query) use ($myFollowersAndFollowing, $user) {
                $query->whereNotIn('follower_id', $myFollowersAndFollowing)
                      ->where('follower_id', '!=', $user->id);
            }])
            ->get()
            ->flatMap(function ($follower) {
                return $follower->followers->pluck('id');
            });

        $newFollowers = $followersOfFollowers->diff($myFollowersAndFollowing)->filter(function ($followerId) use ($user) {
            return $followerId != $user->id;
        });

        $newFollowersData = User::whereIn('id', $newFollowers)->with('profile')->get();

        return response()->json([
            'mutual_followers' => $mutualFollowers,
            'suggestions' => $newFollowersData
        ]);
        */
    }
}
