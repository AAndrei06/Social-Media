<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Video;
use Illuminate\Support\Facades\Auth;

class CheckVideoOwnership
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
        // Obține ID-ul videoclipului din ruta
        $videoId = $request->route('id');
        
        // Găsește videoclipul
        $video = Video::where('uuid', $videoId)->first();
        error_log(Auth::id());
        error_log($video->user_id);
        // Verifică dacă videoclipul există și dacă utilizatorul autenticat este proprietarul
        if (!$video || $video->user_id !== Auth::id()) {
            return response()->json(['error' => 'Nu ai permisiunea de a modifica acest videoclip.'], 403);
        }

        return $next($request);
    }
}
