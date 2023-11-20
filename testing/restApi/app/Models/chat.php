<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class chat extends Model
{
    use HasFactory;
    protected $fillable = [
        'lastText',
        'lastTime',
        'transponderA',
        'transponderB'
    ];
    public function customer(){
        return $this->belongsTo(customer::class);
    }
}
