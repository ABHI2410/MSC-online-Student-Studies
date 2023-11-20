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
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->enum("questionType", ['MCQ', 'Yes/No', 'True/False', 'Single Word', 'Digit']);
            $table->text("question");
            $table->text("optionA")->nullable();
            $table->text("optionB")->nullable();
            $table->text("optionC")->nullable();
            $table->text("optionD")->nullable();
            $table->text("optionE")->nullable();
            $table->text("answer")->nullable();
            $table->text("correctAnser");
            $table->integer("points");
            $table->boolean("deleted")->default(0);
            $table->timestamps();

            $table->foreignId('exam_id')->constrained("exams")->onDelete("cascade");

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
