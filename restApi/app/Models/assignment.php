<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class assignment extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'dueDate',
        'gradePoints',
        'description',
        'availableFrom',
        'availableUntill',
        'files',
        'attemptsAllowed',
        'course_id',
    ];
    public function course(){
        return $this->belongsTo(course::class);
    }
}
