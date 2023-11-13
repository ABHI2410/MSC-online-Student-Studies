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
        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->date('startDate')->default(now());
            $table->integer('duration');
            $table->enum('department',['CSE', 'ASE', 'ME', 'CE', 'BME', 'DM']);
            $table->enum('type',['Bachelor', 'Master', 'Ph.D.']);
            $table->integer('creditsRequired');
            $table->text('overview');
            $table->text('vision');
            $table->text('mission');
            $table->text('careerOpportunities');
            $table->string('location');
            $table->boolean('deleted')->default(0);
            $table->timestamps();

            $table->foreignId('customer_id')->constrained("customers")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('programs');
    }
};
