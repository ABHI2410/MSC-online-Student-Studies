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
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->string("courseID");
            $table->string("name");
            $table->set("day",['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
            $table->time("timeStart");
            $table->time("timeEnd");
            $table->date("startDate");
            $table->date("endDate");
            $table->string("location");
            $table->enum("mode",['IN-PERSON','HYBRID','ONLINE']);
            $table->string("domain");
            $table->integer("credit");
            $table->string("textbook");
            $table->string("syllabus");
            $table->boolean("deleted")->default(0);
            $table->timestamps();

            $table->foreignId('customer_id')->constrained("customers")->onDelete("cascade");
            $table->foreignId('program_id')->constrained("programs")->onDelete("cascade");
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
