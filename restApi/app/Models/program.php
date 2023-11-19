<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class program extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description' ,
        'startDate',
        'duration',
        'department',
        'type',
        'creditsRequired',
        'overview',
        'vision',
        'mission',
        'careerOpportunities',
        'location',
    ];


    public function registrationcodes(){
        return $this->belongsTo(registrationcode::class);
    }
}
