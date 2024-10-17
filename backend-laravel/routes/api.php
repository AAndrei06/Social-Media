<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\HomeController;
use App\Http\Controllers\Api\ShortVideoController;
use App\Http\Controllers\Api\ChatController;
use App\Http\Controllers\Api\FriendController;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, PATCH, DELETE');
header('Access-Control-Allow-Headers: *');

Route::get('/user', function (Request $request) {
    $user = $request->user()->load('profile');
    return response()->json($user);
})->middleware('auth:sanctum');


Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->group(function () {
    // Profile routes
    Route::get('/profile/{id}', [ProfileController::class, 'profileGet']);
    Route::post('/profile/{id}', [ProfileController::class, 'profilePost']);
    Route::post('/profile/follow/{id}', [ProfileController::class, 'follow']);

    // Home (Posts) routes
    Route::prefix('post')->group(function () {
        Route::post('/edit/{id}', [HomeController::class, 'editPost']);
        Route::post('/delete/{id}', [HomeController::class, 'deletePost']);
        Route::post('/comment/{id}', [HomeController::class, 'writeComment']);
        Route::get('/get/comments/{id}', [HomeController::class, 'getComments']);
        Route::post('/delete/comment/{id}', [HomeController::class, 'deleteComment']);
        Route::post('/like/{id}', [HomeController::class, 'likePost']);
        Route::get('/get/likes/{id}', [HomeController::class, 'getLikes']);
    });

    Route::prefix('chat')->group(function () {
        Route::get('/get', [ChatController::class, 'getChat']);
        Route::get('/get/messages/{id}', [ChatController::class, 'getMessages']);
        Route::post('/send/message', [ChatController::class, 'sendMessage']);
    });

    Route::prefix('friends')->group(function () {
        Route::get('/get', [FriendController::class, 'getFriends']);
    });

    // Home (Main) content routes
    Route::post('/', [HomeController::class, 'createPost']);
    Route::get('/', [HomeController::class, 'showContent']);

    // Short Video routes
    Route::prefix('video')->group(function () {
        Route::post('/create', [HomeController::class, 'createShort']);
        Route::post('/like/{id}', [ShortVideoController::class, 'likeVideo']);
        Route::post('/delete/{id}', [ShortVideoController::class, 'deleteVideo']);
        Route::post('/comment/{id}', [ShortVideoController::class, 'commentVideo']);
        Route::get('/get/comments/{id}', [ShortVideoController::class, 'getCommentsVideo']);
        Route::post('/delete/comment/{id}', [ShortVideoController::class, 'deleteCommentVideo']);
    });

    // Video listing
    Route::get('/videos', [ShortVideoController::class, 'showVideos']);
});

// NU UITA DE MIDDLEWARE SANCTUM CA SA MEARGA REQUEST


/*

Route::middleware('auth:sanctum')->get('/profile/{id}', [ProfileController::class, 'profileGet']);
Route::middleware('auth:sanctum')->post('/profile/{id}', [ProfileController::class,'profilePost']);
Route::middleware('auth:sanctum')->post('/', [HomeController::class,'createPost']);
Route::middleware('auth:sanctum')->get('/', [HomeController::class,'showContent']);
Route::middleware('auth:sanctum')->post('/post/edit/{id}', [HomeController::class,'editPost']);
Route::middleware('auth:sanctum')->post('/post/delete/{id}', [HomeController::class,'deletePost']);
Route::middleware('auth:sanctum')->post('/post/comment/{id}', [HomeController::class,'writeComment']);
Route::middleware('auth:sanctum')->get('/post/get/comments/{id}', [HomeController::class,'getComments']);
Route::middleware('auth:sanctum')->post('/post/delete/comment/{id}', [HomeController::class,'deleteComment']);
Route::middleware('auth:sanctum')->post('/post/like/{id}', [HomeController::class,'likePost']);
Route::middleware('auth:sanctum')->get('/post/get/likes/{id}', [HomeController::class,'getLikes']);
Route::middleware('auth:sanctum')->post('/video/create', [HomeController::class,'createShort']);
Route::middleware('auth:sanctum')->get('/videos', [ShortVideoController::class,'showVideos']);
Route::middleware('auth:sanctum')->post('/video/like/{id}', [ShortVideoController::class,'likeVideo']);
Route::middleware('auth:sanctum')->post('/video/delete/{id}', [ShortVideoController::class,'deleteVideo']);
Route::middleware('auth:sanctum')->post('/video/comment/{id}', [ShortVideoController::class,'commentVideo']);
Route::middleware('auth:sanctum')->get('/video/get/comments/{id}', [ShortVideoController::class,'getCommentsVideo']);

*/