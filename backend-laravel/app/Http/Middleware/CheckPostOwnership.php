<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

class CheckPostOwnership
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
        // Obține ID-ul postării din ruta
        $postId = $request->route('id');
        
        // Găsește postarea
        $post = Post::where('uuid', $postId)->first();

        // Verifică dacă postarea există și dacă utilizatorul autenticat este proprietarul
        if (!$post || $post->user_id !== Auth::id()) {
            return response()->json(['error' => 'Nu ai permisiunea de a modifica această postare.'], 403);
        }

        return $next($request);
    }
}
