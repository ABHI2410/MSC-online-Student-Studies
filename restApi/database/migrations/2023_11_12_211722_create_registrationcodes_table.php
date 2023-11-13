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
        Schema::create('registrationcodes', function (Blueprint $table) {
            $table->id();
            $table->string("code");
            $table->enum("role",['Student', 'Instructor', 'QA', 'Program Coordinator', 'Admin']);
            $table->dateTime("validFrom");
            $table->dateTime("validUntill");
            $table->boolean("deleted")->default(0);
            $table->timestamps();

            $table->foreignId('program_id')->constrained("programs")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registrationcodes');
    }
};
