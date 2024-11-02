<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type',
        'photo',
        'read',
        'title',
        'desc',
        'link',
        'idOfUser'
    ];


    public function user()
    {
        return $this->belongsTo(User::class); // Relație cu modelul User
    }
}
