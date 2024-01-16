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
        Schema::create('requests', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('email');
            $table->string('no_wa');
            $table->string('alamat_ht')->nullable();
            $table->string('alamat_st')->nullable();
            $table->json('programs');
            $table->string('period')->nullable();
            $table->text('catatan')->nullable();
            $table->boolean('is_member')->default(false);
            $table->json('programs_acc')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('requests');
    }
};
