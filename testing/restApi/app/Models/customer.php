<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class customer extends Model
{
    use HasFactory;

    protected $fillable = [
            'user_id',
            'userID',
            'emailID',
            'firstName', 
            'lastName', 
            'role',
            'dateOfBirth',
            'age', 
            'term',
            'enrollYear', 
            'phoneNo', 
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }

    public function program(){
        return $this->hasMany(program::class);
    }

    public function answerSubmission(){
        return $this->hasMany(answerSubmission::class);
    }

    public function assignment(){
        return $this->hasMany(assignment::class);
    }

    public function chat(){
        return $this->hasMany(chat::class);
    }

    public function exam(){
        return $this->hasMany(exam::class);
    }

}
