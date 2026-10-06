<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\OsmPoi;
use Illuminate\Support\Facades\DB;

class OsmPoiSeeder extends Seeder
{
    public function run(): void
    {
        // Generate random POIs around Kemang (-6.2625, 106.8141)
        $centerLat = -6.2625;
        $centerLon = 106.8141;

        $types = ['fnb', 'fnb', 'fnb', 'laundry', 'retail'];
        
        $inserted = 0;
        for ($i = 0; $i < 200; $i++) {
            // Generate coordinates within roughly ~2-3km radius
            $lat = $centerLat + (mt_rand(-20000, 20000) / 1000000); // approx +/- 0.02 deg
            $lon = $centerLon + (mt_rand(-20000, 20000) / 1000000);
            
            $type = $types[array_rand($types)];
            
            OsmPoi::create([
                'osm_id' => mt_rand(10000000, 99999999),
                'type' => 'node',
                'category' => 'synthetic',
                'subcategory' => $type,
                'name' => 'Dummy ' . ucfirst($type) . ' ' . $i,
                'geom' => DB::raw("ST_SetSRID(ST_MakePoint({$lon}, {$lat}), 4326)")
            ]);
            $inserted++;
        }
        
        $this->command->info("Seeded {$inserted} synthetic POIs around Kemang.");
    }
}
