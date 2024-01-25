<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class answerSubmission extends Model
{
    use HasFactory;
    protected $fillable = [
        'answer',
        'grade',
        'customer_id',
        'question_id'
    ];
    public function customer(){
        return $this->belongsTo(customer::class);
    }
    public function question(){
        return $this->belongsTo(question::class);
    }
    
    

}

