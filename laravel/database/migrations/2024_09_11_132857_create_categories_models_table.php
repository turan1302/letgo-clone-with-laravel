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
        Schema::create('categories', function (Blueprint $table) {
            $table->id('ct_id');
            $table->string('ct_name')->nullable();
            $table->string('ct_image')->nullable();
            $table->string('ct_slug')->nullable();
            $table->softDeletes();
            $table->timestamp('ct_created_at')->nullable();
            $table->timestamp('ct_updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
