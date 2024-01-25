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
        Schema::create('permissions', function (Blueprint $table) {
            $table->id();
            $table->string('tableName');
            $table->enum("role", ['Student', 'Instrutor', 'Program Co-ordinator', 'Qualtiy Assurance', 'Admin']);
            $table->enum('permission',['VIEW ONLY', 'ADD ONLY', 'MODIFY ONLY', 'REMOVE ONLY', 'ADD AND VIEW' , 
                            'ADD AND MODIFY','ADD AND REMOVE', 'VIEW AND MODIFY', 'VIEW AND REMOVE', 
                            'MODIFY AND REMOVE', 'ADD, VIEW AND MODIFY', 'ADD, VIEW AND REMOVE', 
                            'VIEW, MODIFY AND REMOVE', 'ADD, MODIFY, VIEW AND DELETE']);
            $table->boolean("deleted")->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permissions');
    }
};
