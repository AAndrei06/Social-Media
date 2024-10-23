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

        $mutualFollowers = User::whereHas('followers', function ($query) use ($user) {
            $query->where('follower_id', $user->id);
        })->whereHas('following', function ($query) use ($user) {
            $query->where('followed_id', $user->id);
        })->with('profile')
          ->get();

        $myFollowers = $user->followers()->pluck('follower_id');

        // Step 2: Get all the users the current user is following
        $myFollowing = $user->following()->pluck('followed_id');

        // Combine followers and following into one list to filter out later
        $myFollowersAndFollowing = $myFollowers->merge($myFollowing);

        // Step 3: Retrieve followers of my followers, filtering out those that I already follow or who already follow me, and exclude the current user
        $followersOfFollowers = User::whereIn('id', $myFollowers)
            ->with(['followers' => function ($query) use ($myFollowersAndFollowing, $user) {
                // Get followers of followers but exclude those that already follow me, those I follow, and the current user
                $query->whereNotIn('follower_id', $myFollowersAndFollowing)
                      ->where('follower_id', '!=', $user->id);
            }])
            ->get()
            ->flatMap(function ($follower) {
                // Extract and return the followers of the followers
                return $follower->followers->pluck('id');
            });

        // Step 4: Filter out users that are already following me or I am following, and exclude the current user
        $newFollowers = $followersOfFollowers->diff($myFollowersAndFollowing)->filter(function ($followerId) use ($user) {
            return $followerId != $user->id;  // Exclude current user's ID
        });

        // Step 5: Fetch and return user data for the new followers, including their profiles
        $newFollowersData = User::whereIn('id', $newFollowers)->with('profile')->get();



        return response()->json([
            'mutual_followers' => $mutualFollowers,
            'suggestions' => $newFollowersData
        ]);
    }
}
