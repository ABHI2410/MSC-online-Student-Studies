<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class programrequirements extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'minimumRequired',
        'maximunAllowed',
        'additionalRequirements',
        'program_id'
    ];
    public function program(){
        return $this->belongsTo(program::class);
    }

}
