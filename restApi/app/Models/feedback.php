<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class feedback extends Model
{
    use HasFactory;
    protected $fillable = [
        'answer',
        'review_id'
    ];
    public function review(){
        return $this->belongsTo(review::class);
    }
}
