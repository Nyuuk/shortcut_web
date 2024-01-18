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
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('request_id');
            $table->foreign('request_id')->references('id')->on('requests');
            $table->string('invoice_number')->unique();
            $table->foreignId('payment_method_id');
            $table->foreign('payment_method_id')->references('id')->on('payment_methods');
            $table->boolean('status')->default(false);
            // $table->string('total_price')->nullable();
            // $table->string('total_pay')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
