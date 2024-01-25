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
        Schema::create('submissions', function (Blueprint $table) {
            $table->id();
            $table->float("grade");
            $table->text("submission");
            $table->text("comments");
            $table->boolean("deleted")->default(0);
            $table->timestamps();

            $table->foreignId('customer_id')->constrained("customers")->onDelete("cascade");
            $table->foreignId('assignment_id')->constrained("assignments")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('submissions');
    }
};
