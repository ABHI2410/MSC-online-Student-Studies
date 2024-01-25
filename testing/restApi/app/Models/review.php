<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class review extends Model
{
    use HasFactory;
    protected $fillable = [
        'category',
        'type',
        'question',
        'program_id',
        'course_id',
    ];
    public function program(){
        return $this->belongsTo(program::class);
    }
    public function course(){
        return $this->belongsTo(course::class);
    }

    public function feeback(){
        return $this->hasMany(feedback::class);
    }
}
