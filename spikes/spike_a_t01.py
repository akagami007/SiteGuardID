import urllib.request
import urllib.parse
import time
import json
import statistics

# Spike A-T01: InaRISK ImageServer identify endpoint
BASE_URL = "https://gis.bnpb.go.id/server/rest/services/inarisk/INDEKS_BAHAYA_BANJIR/ImageServer/identify"

points = [
    {"name": "Monas (JakPus)", "lat": -6.1754, "lon": 106.8272},
    {"name": "Kemang (JakSel - Flood Prone)", "lat": -6.2625, "lon": 106.8141},
    {"name": "PIK (JakUt)", "lat": -6.1091, "lon": 106.7388},
    {"name": "Kampung Melayu (JakTim - Flood Prone)", "lat": -6.2238, "lon": 106.8660},
    {"name": "Bundaran HI", "lat": -6.1950, "lon": 106.8231},
    {"name": "Grogol (JakBar - Flood Prone)", "lat": -6.1643, "lon": 106.7885},
    {"name": "Margonda (Depok)", "lat": -6.3725, "lon": 106.8322},
    {"name": "BSD (TangSel)", "lat": -6.2941, "lon": 106.6622},
    {"name": "Summarecon (Bekasi)", "lat": -6.2223, "lon": 107.0016},
    {"name": "Kebun Raya (Bogor)", "lat": -6.5976, "lon": 106.7996},
    {"name": "Pluit (JakUt)", "lat": -6.1171, "lon": 106.7925},
    {"name": "Ciledug (Tangerang - Flood Prone)", "lat": -6.2307, "lon": 106.7115},
    {"name": "Jatiasih (Bekasi - Flood Prone)", "lat": -6.3079, "lon": 106.9536},
    {"name": "Kelapa Gading (JakUt - Flood Prone)", "lat": -6.1601, "lon": 106.9064},
    {"name": "Bintaro (TangSel)", "lat": -6.2731, "lon": 106.7360},
    {"name": "Tebet (JakSel)", "lat": -6.2274, "lon": 106.8450},
    {"name": "Cibubur (JakTim)", "lat": -6.3477, "lon": 106.8831},
    {"name": "Sentul (Bogor)", "lat": -6.5683, "lon": 106.8659},
    {"name": "Cikarang (Kab. Bekasi)", "lat": -6.2662, "lon": 107.1437},
    {"name": "Ciputat (TangSel)", "lat": -6.3134, "lon": 106.7554}
]

def check_point(pt):
    # Construct geometry object
    geometry = {
        "x": pt["lon"],
        "y": pt["lat"],
        "spatialReference": {"wkid": 4326}
    }
    
    params = {
        "geometry": json.dumps(geometry),
        "geometryType": "esriGeometryPoint",
        "returnGeometry": "false",
        "f": "json"
    }
    
    query_string = urllib.parse.urlencode(params)
    url = f"{BASE_URL}?{query_string}"
    
    start_time = time.time()
    try:
        import ssl
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=10, context=ctx) as response:
            data = json.loads(response.read().decode())
        latency = (time.time() - start_time) * 1000  # ms
        return {"success": True, "data": data, "latency": latency, "pt": pt}
    except Exception as e:
        latency = (time.time() - start_time) * 1000
        return {"success": False, "error": str(e), "latency": latency, "pt": pt}

def main():
    print("Executing Spike A-T01: InaRISK ImageServer 'identify'")
    print(f"Target: {BASE_URL}")
    print(f"Testing {len(points)} points in Jabodetabek...\n")
    
    latencies = []
    results = []
    
    for i, pt in enumerate(points):
        print(f"[{i+1}/{len(points)}] Checking {pt['name']}...")
        res = check_point(pt)
        results.append(res)
        
        if res["success"]:
            val = res["data"].get("value", "N/A")
            print(f"  -> Value: {val} | Latency: {res['latency']:.2f} ms")
            latencies.append(res['latency'])
        else:
            print(f"  -> FAILED: {res['error']} | Latency: {res['latency']:.2f} ms")
            
        time.sleep(0.5) # Be nice to the server
        
    print("\n=== SUMMARY ===")
    success_count = sum(1 for r in results if r["success"])
    print(f"Success rate: {success_count}/{len(points)}")
    
    if latencies:
        print(f"Avg latency: {statistics.mean(latencies):.2f} ms")
        print(f"Min latency: {min(latencies):.2f} ms")
        print(f"Max latency: {max(latencies):.2f} ms")
        print(f"P50 latency: {statistics.median(latencies):.2f} ms")
        
        if len(latencies) >= 2:
            try:
                print(f"P95 latency: {statistics.quantiles(latencies, n=20)[18]:.2f} ms")
            except:
                pass
            
    print("\nSample Response Payload:")
    if success_count > 0:
        sample_success = next(r for r in results if r["success"])
        print(json.dumps(sample_success["data"], indent=2))

if __name__ == '__main__':
    main()
