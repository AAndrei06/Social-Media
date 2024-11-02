<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('chat.{user1Id}.{user2Id}', function ($user, $user1Id, $user2Id) {
    return (int) $user->id === (int) $user1Id || (int) $user->id === (int) $user2Id;
});

Broadcast::channel('notification-{userId}', function ($user, $userId) {
    return (int) $user->id === (int) $userId; // Permite accesul utilizatorului dacă ID-ul său se potrivește
});