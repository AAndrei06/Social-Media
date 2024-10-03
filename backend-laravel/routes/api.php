<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProfileController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout']);
Route::middleware('auth:sanctum')->get('/profile/{id}', [ProfileController::class, 'profileGet']);
Route::middleware('auth:sanctum')->post('/profile/{id}', [ProfileController::class,'profilePost']);

// NU UITA DE MIDDLEWARE SANCTUM CA SA MEARGA REQUEST