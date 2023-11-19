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
        Schema::create('answer_submissions', function (Blueprint $table) {
            $table->id();
            $table->text("answer");
            $table->float('grade');
            $table->boolean("deleted")->default(0);
            $table->timestamps();
            $table->foreignId('customer_id')->constrained("customers")->onDelete("cascade");
            $table->foreignId('question_id')->constrained("questions")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('answer_submissions');
    }
};
