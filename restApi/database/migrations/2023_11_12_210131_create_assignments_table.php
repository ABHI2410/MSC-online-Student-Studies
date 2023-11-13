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
        Schema::create('assignments', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->dateTime('dueDate');
            $table->float('gradePoints');
            $table->text('description');
            $table->dateTime('availableFrom');
            $table->dateTime('availableUntill');
            $table->text('files');
            $table->integer('attemptsAllowed')->default(-1);
            $table->boolean("deleted")->default(0);
            $table->timestamps();

            $table->foreignId('course_id')->constrained("courses")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assignments');
    }
};
