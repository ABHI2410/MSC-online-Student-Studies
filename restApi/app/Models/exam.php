<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class exam extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'createdAt',
        'duration',
        'numberOfQuestion',
        'validFrom',
        'validUntil',
        'dueDate',
        'instructions',
        'maxScore',
        'highestScore',
        'lowestScore',
        'meanScore',
        'medianScore',
        'upperQuantileScore',
        'lowerQuantileScore',
        'course_id',
        'customer_id'
    ];
    public function customer(){
        return $this->belongsTo(customer::class);
    }
    public function course(){
        return $this->belongsTo(course::class);
    }
}
