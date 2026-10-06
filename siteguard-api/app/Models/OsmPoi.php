<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OsmPoi extends Model
{
    protected $fillable = [
        'osm_id',
        'type',
        'category',
        'subcategory',
        'name',
        'geom',
    ];
}
