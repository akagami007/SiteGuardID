import requests
import json

# Spike A-T04: OpenStreetMap Competitor Check (Sanity check)
# Overpass API to fetch cafes and laundries within 2km of Kemang, South Jakarta

OVERPASS_URL = "https://overpass-api.de/api/interpreter"

# Kemang coordinate
lat = -6.2625
lon = 106.8141
radius = 2000

# Overpass QL to get cafes and laundries
query = f"""
[out:json];
(
  node["amenity"="cafe"](around:{radius},{lat},{lon});
  way["amenity"="cafe"](around:{radius},{lat},{lon});
  node["shop"="laundry"](around:{radius},{lat},{lon});
  way["shop"="laundry"](around:{radius},{lat},{lon});
  node["shop"="dry_cleaning"](around:{radius},{lat},{lon});
);
out center;
"""

def main():
    print(f"Executing Spike A-T04: OSM POI Data Completeness (via Overpass)")
    print(f"Target Area: Kemang (Lat: {lat}, Lon: {lon}), Radius: {radius}m\n")
    
    try:
        response = requests.post(OVERPASS_URL, data={'data': query}, headers={'User-Agent': 'Mozilla/5.0'})
        if response.status_code != 200:
            print(f"Error: {response.status_code} - {response.text[:100]}")
            return
            
        res = response.json()
        
        elements = res.get("elements", [])
        print(f"Total POIs found: {len(elements)}")
        
        cafes = 0
        laundries = 0
        for el in elements:
            tags = el.get("tags", {})
            if tags.get("amenity") == "cafe":
                cafes += 1
            elif tags.get("shop") in ["laundry", "dry_cleaning"]:
                laundries += 1
                
        print(f"Cafes: {cafes}")
        print(f"Laundries: {laundries}")
        
        if cafes < 50 or laundries < 10:
            print("\n[WARNING] Competitor count is very low for a busy area like Kemang.")
            print("This means OSM is heavily under-mapped in Indonesia for small businesses.")
        else:
            print("\n[OK] Found a reasonable amount of data for the area.")
            
    except Exception as e:
        print(f"Error querying Overpass: {e}")

if __name__ == '__main__':
    main()
