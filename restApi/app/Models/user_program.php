<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class user_program extends Model
{
    use HasFactory;

    protected $fillable = ['customer_id', 'program_id'];

    public function customer(){
        return $this->belongsTo(customer::class);
    }
    public function program(){
        return $this->belongsTo(program::class);
    }
}
