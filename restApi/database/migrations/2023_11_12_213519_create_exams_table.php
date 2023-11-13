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
        Schema::create('exams', function (Blueprint $table) {
            $table->id();
            $table->string("title");
            $table->dateTime("createdAt");
            $table->time("duration");
            $table->integer("numberOfQuestions");
            $table->dateTime("validFrom");
            $table->dateTime("validUntill");
            $table->dateTime("dueDate");
            $table->text("instructions");
            $table->boolean("deleted")->default(0);
            $table->timestamps();

            $table->foreignId('course_id')->constrained("courses")->onDelete("cascade");
            $table->foreignId('customer_id')->constrained("customers")->onDelete("cascade");

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exams');
    }
};
