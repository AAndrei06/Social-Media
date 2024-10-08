<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = ['first_name',
                           'last_name',
                           'gender',
                           'birth_date',
                           'user_id',
                           'back_photo',
                           'profile_photo',
                           'occupation',
                           'location',
                           'education',
                           'person',
                           'follows',
                           'is_followed',
                           'resume'
                           ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
