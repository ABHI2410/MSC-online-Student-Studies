<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class question extends Model
{
    use HasFactory;
    protected $fillable = [
        'questionType',
        'question',
        'optionA',
        'optionB',
        'optionC',
        'optionD',
        'optionE',
        'answer',
        'correctAnswer',
        'points',
        'exam_id',
    ];
    public function exam(){
        return $this->belongsTo(exam::class);
    }

    public function answerSubmission(){
        return $this->hasMany(answerSubmission::class);
    }


}
