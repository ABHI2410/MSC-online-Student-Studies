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
        Schema::table('assignments', function (Blueprint $table) {
            
            $table->integer('attemptsAllowed')->nullable()->change()->default(null);
            $table->float("maxScore")->nullable()->change()->default(null);
            $table->float("highestScore")->nullable()->change()->default(null);
            $table->float("lowestScore")->nullable()->change()->default(null);
            $table->float("meanScore")->nullable()->change()->default(null);
            $table->float("medianScore")->nullable()->change()->default(null);
            $table->float("upperQuantileScore")->nullable()->change()->default(null);
            $table->float("lowerQuantileScore")->nullable()->change()->default(null);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('assignments', function (Blueprint $table) {
            //
        });
    }
};
