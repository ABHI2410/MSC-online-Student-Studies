<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class registrationcode extends Model
{
    use HasFactory;
    protected $fillable = [
        'code',
        'role',
        'validFrom',
        'validUntill', 
        'program_id',
    ];

    public function program(){
        return $this->hasMany(program::class);
    }

}
