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
        Schema::create('programrequirements', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->text("description");
            $table->text('minimumRequired');
            $table->text('maximumAllowed');
            $table->text('additionalRequirements');
            $table->boolean('deleted')->default(0);
            $table->timestamps();

            $table->foreignId('program_id')->constrained("programs")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('programrequirements');
    }
};
