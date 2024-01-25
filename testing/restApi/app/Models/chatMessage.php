<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class chatMessage extends Model
{
    use HasFactory;
    protected $fillable = [
        'message',
        'messageTime',
        'attachments',
        'transponderSender',
        'chat_id'
    ];
    public function customer(){
        return $this->belongsTo(customer::class);
    }
    public function chat(){
        return $this->belongsTo(chat::class);
    }
}
