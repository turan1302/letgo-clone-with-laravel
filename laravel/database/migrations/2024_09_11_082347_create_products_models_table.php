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
        Schema::create('products', function (Blueprint $table) {
            $table->id('pd_id');
            $table->string('pd_name')->nullable();
            $table->text('pd_description')->nullable();
            $table->integer('pd_category')->nullable();
            $table->string('pd_image')->nullable();
            $table->string('pd_brand')->nullable();
            $table->decimal("pd_price",9,2)->nullable();
            $table->integer("pd_rating")->nullable();
            $table->integer("pd_numreviews")->nullable();
            $table->softDeletes();
            $table->timestamp('pd_created_at')->nullable();
            $table->timestamp('pd_updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
