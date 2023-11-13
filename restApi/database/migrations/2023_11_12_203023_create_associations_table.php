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
        Schema::create('associations', function (Blueprint $table) {
            $table->id();
            $table->enum('type',['Basics', 'Specialty', 'Breadth','Additional']);
            $table->enum('role',['Student','Teacher','Teaching Assistant']);
            $table->boolean("deleted")->default(0);
            $table->timestamps();

            $table->foreignId('customer_id')->constrained("customers")->onDelete("cascade");

            $table->foreignId('program_id')->constrained("programs")->onDelete("cascade");

            $table->foreignId('course_id')->constrained("courses")->onDelete("cascade");

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('associations');
    }
};
