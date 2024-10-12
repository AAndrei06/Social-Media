<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Commentv;

class Video extends Model
{
    use HasFactory;

    protected $fillable = ['body',
                           'file',
                           'uuid',
                           'user_id'
                           ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function likes(){
        return $this->belongsToMany(User::class,'video_user','video_id','user_id');
    }

    public function comments()
    {
        return $this->hasMany(Commentv::class);
    }

}
