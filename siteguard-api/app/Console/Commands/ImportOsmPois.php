<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
use App\Models\OsmPoi;

class ImportOsmPois extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'osm:import {--bbox=-6.40,106.65,-6.00,107.00 : Bounding box (S,W,N,E)}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Imports POIs (Cafes, Restaurants, Laundry, Retail) from Overpass API into PostGIS';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $bbox = $this->option('bbox');
        $this->info("Starting OSM POI Import for Bounding Box: {$bbox}");

        // Overpass QL Query
        // We use 'out center;' so ways and relations provide a center lat/lon
        $query = <<<QL
        [out:json][timeout:60];
        (
          node["amenity"~"cafe|restaurant"]({$bbox});
          way["amenity"~"cafe|restaurant"]({$bbox});
          node["shop"~"laundry|convenience"]({$bbox});
          way["shop"~"laundry|convenience"]({$bbox});
        );
        out center;
        QL;

        $this->info("Fetching data from Overpass API...");

        $response = Http::withHeaders([
            'User-Agent' => 'SiteGuardID/1.0 (admin@siteguard.id)'
        ])->timeout(120)->asForm()->post('https://overpass-api.de/api/interpreter', [
            'data' => $query
        ]);

        if ($response->failed()) {
            $this->error("Failed to fetch data from Overpass. HTTP Status: " . $response->status());
            return;
        }

        $data = $response->json();
        $elements = $data['elements'] ?? [];
        $total = count($elements);

        if ($total === 0) {
            $this->warn("No POIs found in the given bounding box.");
            return;
        }

        $this->info("Found {$total} POIs. Beginning database insertion...");
        
        $bar = $this->output->createProgressBar($total);
        $inserted = 0;

        foreach ($elements as $el) {
            try {
                $lat = $el['lat'] ?? $el['center']['lat'] ?? null;
                $lon = $el['lon'] ?? $el['center']['lon'] ?? null;

                if (!$lat || !$lon) continue;

                $tags = $el['tags'] ?? [];
                
                $category = isset($tags['amenity']) ? 'amenity' : (isset($tags['shop']) ? 'shop' : 'unknown');
                $subcategory = $tags['amenity'] ?? $tags['shop'] ?? 'unknown';

                // Map specific types for uniform querying
                if (in_array($subcategory, ['cafe', 'restaurant'])) $subcategory = 'fnb';
                if (in_array($subcategory, ['convenience'])) $subcategory = 'retail';
                
                OsmPoi::updateOrCreate(
                    ['osm_id' => $el['id']],
                    [
                        'type' => $el['type'],
                        'category' => $category,
                        'subcategory' => $subcategory,
                        'name' => $tags['name'] ?? null,
                        'geom' => DB::raw("ST_SetSRID(ST_MakePoint({$lon}, {$lat}), 4326)")
                    ]
                );
                
                $inserted++;
            } catch (\Exception $e) {
                // Ignore single failures
            }
            $bar->advance();
        }

        $bar->finish();
        $this->newLine();
        $this->info("Successfully inserted/updated {$inserted} POIs.");
    }
}
