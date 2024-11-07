<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Message;

class CheckMessageSender
{
    /**
     * Verifica daca utilizatorul autenticat este expeditorul mesajului.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Extrage ID-ul mesajului din ruta
        $messageId = $request->route('id'); // presupunem că ID-ul mesajului este în URL
        
        // Căutăm mesajul
        $message = Message::find($messageId);

        if (!$message) {
            return response()->json(['message' => 'Mesajul nu a fost găsit.'], 404);
        }

        // Verificăm dacă utilizatorul autentificat este expeditorul mesajului
        if ($message->sender_id !== Auth::id()) {
            return response()->json(['message' => 'Nu aveți permisiunea să ștergeți acest mesaj.'], 403);
        }

        return $next($request);
    }
}
