<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\HomeController;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, PATCH, DELETE');
header('Access-Control-Allow-Headers: *');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
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

// NU UITA DE MIDDLEWARE SANCTUM CA SA MEARGA REQUEST