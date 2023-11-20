<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class course extends Model
{
    use HasFactory;
    protected $fillable = [
            'courseID',
            'name',  
            'day',
            'timeStart',
            'timeEnd',
            'startDate', 
            'endDate',
            'location'  ,
            'mode',
            'domain'  ,
            'credit'  ,
            'textbook'  ,
            'syllabus'  ,
            'customer_id',
            'program_id',
    ];

    public function customer(){
        return $this->belongsTo(customer::class);
    }

    public function program(){
        return $this->belongsTo(program::class);
    }

    public function assignment(){
        return $this->hasMany(assignment::class);
    }

    public function exam(){
        return $this->hasMany(exam::class);
    }

    public function modules(){
        return $this->hasMany(modules::class);
    }

}
