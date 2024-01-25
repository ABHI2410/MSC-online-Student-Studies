<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class modules extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'section',
        'location',
        'description',
        'course_id',
    ];
    public function course(){
        return $this->belongsTo(course::class);
    }
}
