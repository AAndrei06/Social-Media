<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Video;
use App\Models\User;

class Commentv extends Model
{
    use HasFactory;

    protected $fillable = [
                            'content',
                            'video_id',
                            'user_id'
                           ];

    public function video(){
        return $this->belongsTo(Video::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function profile()
    {
        return $this->user->profile();
    }
}
