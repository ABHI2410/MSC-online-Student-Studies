<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class user_course extends Model
{
    use HasFactory;
    protected $fillable = [
        'erolled_type',
        'customer_id',
        'course_id'
    ];
    public function customer(){
        return $this->belongsTo(customer::class);
    }
    public function course(){
        return $this->belongsTo(course::class);
    }
}
