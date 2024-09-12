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
        Schema::create('product_images', function (Blueprint $table) {
            $table->id('pdi_id');
            $table->integer('pdi_product')->nullable();
            $table->string('pdi_image')->nullable();
            $table->softDeletes();
            $table->timestamp('pdi_created_at')->nullable();
            $table->timestamp('pdi_updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_images');
    }
};
