<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Report;

class AnalysisController extends Controller
{
    public function index()
    {
        $reports = Report::orderBy('created_at', 'desc')->take(10)->get();
        return response()->json($reports);
    }

    public function evaluate(Request $request)
    {
        // 1. Validasi Input
        $validated = $request->validate([
            'location_name' => 'required|string|max:255',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
            'business_type' => 'required|string|max:255',
            'capex' => 'required|numeric',
            'rent_per_year' => 'required|numeric',
            'rent_duration' => 'required|numeric',
            'target_revenue' => 'required|numeric',
            'gross_margin' => 'required|numeric', // percentage e.g., 50 for 50%
            'monthly_fixed_cost' => 'required|numeric',
        ]);

        // 2. Simulasi Scoring (Mengeksekusi "Engine" palsu untuk MVP)
        // Di masa depan, ini akan memanggil Engine terpisah (Hazard, Market, Weather)
        
        $hazardScore = $this->simulateHazard($validated['latitude'], $validated['longitude']);
        $competitorScore = $this->calculateCompetitors($validated['latitude'], $validated['longitude'], $validated['business_type']);
        $financialScore = $this->calculateFinancials($validated);

        // 3. Logika Keputusan Keseluruhan
        $decision = 'GO';
        if ($hazardScore['risk_level'] === 'High' || $financialScore['margin_of_safety'] < 10) {
            $decision = 'NO-GO';
        } elseif ($hazardScore['risk_level'] === 'Medium' || $competitorScore['density'] === 'High') {
            $decision = 'REVIEW';
        }

        $results = [
            'hazard' => $hazardScore,
            'market' => $competitorScore,
            'financial' => $financialScore,
            'overall_score' => rand(50, 95) // Dummy
        ];

        // 4. Simpan ke Database
        $report = Report::create([
            'location_name' => $validated['location_name'],
            'latitude' => $validated['latitude'],
            'longitude' => $validated['longitude'],
            'business_type' => $validated['business_type'],
            'parameters' => $validated,
            'results' => $results,
            'decision' => $decision,
        ]);

        // 5. Kembalikan Response
        return response()->json([
            'message' => 'Analysis completed successfully',
            'report_id' => $report->id,
            'decision' => $decision,
            'results' => $results
        ]);
    }

    private function simulateHazard($lat, $lon)
    {
        // Dummy logika: makin ke utara Jakarta makin tinggi risikon3ya
        $risk = 'Low';
        if ($lat > -6.15) $risk = 'High';
        elseif ($lat > -6.20) $risk = 'Medium';

        return [
            'risk_level' => $risk,
            'flood_index' => rand(0, 10) / 10,
            'notes' => "Simulated hazard for lat: {$lat}"
        ];
    }

    private function calculateCompetitors($lat, $lon, $type)
    {
        $targetSubcategory = 'fnb'; // Default
        if (in_array($type, ['cafe', 'resto'])) $targetSubcategory = 'fnb';
        if ($type === 'laundry') $targetSubcategory = 'laundry';
        if ($type === 'retail') $targetSubcategory = 'retail';

        // Hitung kompetitor radius 500m
        $count500m = \Illuminate\Support\Facades\DB::table('osm_pois')
            ->where('subcategory', $targetSubcategory)
            ->whereRaw("ST_DWithin(geom::geography, ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography, 500)", [$lon, $lat])
            ->count();
            
        // Hitung kompetitor radius 2km
        $count2km = \Illuminate\Support\Facades\DB::table('osm_pois')
            ->where('subcategory', $targetSubcategory)
            ->whereRaw("ST_DWithin(geom::geography, ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography, 2000)", [$lon, $lat])
            ->count();

        // Logika scoring
        $density = 'Low';
        if ($count500m > 5 || $count2km > 20) {
            $density = 'High';
        } elseif ($count500m > 2 || $count2km > 10) {
            $density = 'Medium';
        }

        return [
            'competitor_count_500m' => $count500m,
            'competitor_count_2km' => $count2km,
            'density' => $density,
            'notes' => "Ditemukan {$count500m} pesaing dalam 500m, dan {$count2km} dalam 2km."
        ];
    }

    private function calculateFinancials($data)
    {
        // Hitung Margin of Safety dll
        $monthlyRevenue = $data['target_revenue'];
        $grossProfit = $monthlyRevenue * ($data['gross_margin'] / 100);
        $monthlyRent = $data['rent_per_year'] / 12;
        $netProfit = $grossProfit - $data['monthly_fixed_cost'] - $monthlyRent;

        $totalCapex = $data['capex'] + ($data['rent_per_year'] * $data['rent_duration']);
        
        $paybackMonths = $netProfit > 0 ? $totalCapex / $netProfit : 999;
        
        // Margin of safety = (Revenue - Break Even Point) / Revenue
        $breakEvenRevenue = ($data['monthly_fixed_cost'] + $monthlyRent) / ($data['gross_margin'] / 100);
        $marginOfSafety = 0;
        if ($monthlyRevenue > 0) {
            $marginOfSafety = (($monthlyRevenue - $breakEvenRevenue) / $monthlyRevenue) * 100;
        }

        return [
            'net_profit_per_month' => round($netProfit),
            'payback_period_months' => round($paybackMonths, 1),
            'margin_of_safety' => round($marginOfSafety, 2),
            'notes' => $marginOfSafety < 10 ? 'Margin sangat tipis, risiko tinggi' : 'Margin sehat'
        ];
    }
}
