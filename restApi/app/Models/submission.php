<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class submission extends Model
{
    use HasFactory;
    protected $fillable = [
        'grade',
        'submission',
        'comments',
        'customer_id',
        'assigment_id',

    ];
    public function customer(){
        return $this->belongsTo(customer::class);
    }
    public function assignment(){
        return $this->belongsTo(assignment::class);
    }
}
