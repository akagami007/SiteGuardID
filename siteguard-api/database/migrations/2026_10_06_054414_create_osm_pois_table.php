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
        Schema::create('osm_pois', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('osm_id')->index();
            $table->string('type')->nullable(); // node, way, relation
            $table->string('category')->index(); // amenity, shop, etc
            $table->string('subcategory')->index(); // cafe, laundry, etc
            $table->string('name')->nullable();
            $table->geometry('geom', 'point', 4326)->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('osm_pois');
    }
};
