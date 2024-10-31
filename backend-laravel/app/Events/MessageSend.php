<?php
namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\Message;

class MessageSend implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;

    public function __construct(Message $message)
    {
        $this->message = $message;
    }

    public function broadcastOn(): array
    {
        // Sortăm ID-urile pentru a crea un canal unic
        $user1Id = min($this->message->sender_id, $this->message->receiver_id);
        $user2Id = max($this->message->sender_id, $this->message->receiver_id);
        
        return [
            new Channel('chat.' . $user1Id . '.' . $user2Id), // Canal unic
        ];
    }

    public function broadcastAs()
    {
        return 'message'; // Numele evenimentului
    }
}
