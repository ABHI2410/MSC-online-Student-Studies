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

}
