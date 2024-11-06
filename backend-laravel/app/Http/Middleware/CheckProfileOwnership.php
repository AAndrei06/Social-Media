<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class CheckProfileOwnership
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Obține ID-ul utilizatorului din ruta
        $userId = $request->route('id');
        
        // Verifică dacă utilizatorul autentificat este proprietarul profilului
        if (Auth::id() != User::where('idKey', $userId)->first()->id) {
            return response()->json(['error' => 'Nu ai permisiunea de a modifica acest profil.'], 403);
        }

        return $next($request);
    }
}
