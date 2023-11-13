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
        Schema::create('customers', function (Blueprint $table) {
            $table->id();

            $table->bigInteger("userID");
            $table->string("firstName");
            $table->string("lastName");
            $table->enum("role",['Student', 'Instructor', 'QA', 'Program Coordinator', 'Admin']);
            $table->dateTime("dateOfBirth");
            $table->integer("age");
            $table->enum("term",['Fall', 'Spring', 'Summer']);
            $table->string("enrollYear");
            $table->string("phoneNo");
            $table->text("address");
            $table->text("aboutMe");
            $table->string("linkedIn");
            $table->string("github");
            $table->string("instagram");
            $table->string("twitter");
            $table->string("facebook");
            $table->boolean("deleted")->default(0);
            $table->timestamps();

            $table->foreignId('user_id')->constrained("users")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
