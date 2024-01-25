<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('chats', function (Blueprint $table) {
            $table->id();
            $table->text('lastText');
            $table->dateTime('lastTime');
            $table->boolean('deleted')->default(0);
            $table->timestamps();

            $table->foreignId('transponderA')->constrained("customers")->onDelete("cascade");
            $table->foreignId('transponderB')->constrained("customers")->onDelete("cascade");

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chats');
    }
};
