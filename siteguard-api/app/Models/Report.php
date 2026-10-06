<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Report extends Model
{
    use HasUuids;

    protected $fillable = [
        'location_name',
        'latitude',
        'longitude',
        'business_type',
        'parameters',
        'results',
        'decision',
    ];

    protected $casts = [
        'parameters' => 'array',
        'results' => 'array',
    ];
}
