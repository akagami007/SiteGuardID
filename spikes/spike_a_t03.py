import psycopg2
import random
import time
import statistics

# Spike A-T03: PostGIS Performance Check
# Target: ST_DWithin on 100k POIs under 200ms

DB_PARAMS = {
    "dbname": "siteguard",
    "user": "siteguard",
    "password": "password",
    "host": "localhost",
    "port": "5433"
}

def setup_db():
    conn = psycopg2.connect(**DB_PARAMS)
    conn.autocommit = True
    cur = conn.cursor()
    
    print("Enabling PostGIS extension...")
    cur.execute("CREATE EXTENSION IF NOT EXISTS postgis;")
    
    print("Creating table osm_pois...")
    cur.execute("DROP TABLE IF EXISTS osm_pois;")
    cur.execute("""
        CREATE TABLE osm_pois (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255),
            category VARCHAR(50),
            geom geometry(Point, 4326)
        );
    """)
    
    print("Generating 100,000 random POIs in Jabodetabek...")
    # Jabodetabek bbox roughly:
    # Lon: 106.4 to 107.3
    # Lat: -6.7 to -5.9
    categories = ['cafe', 'laundry', 'restaurant', 'convenience', 'bank', 'school']
    
    # Batch insert
    insert_query = "INSERT INTO osm_pois (name, category, geom) VALUES %s"
    data = []
    for i in range(100000):
        lon = random.uniform(106.4, 107.3)
        lat = random.uniform(-6.7, -5.9)
        cat = random.choice(categories)
        # PostGIS geometry format: ST_SetSRID(ST_MakePoint(lon, lat), 4326)
        # Using WKT: POINT(lon lat)
        wkt = f"POINT({lon} {lat})"
        data.append((f"POI_{i}", cat, wkt))
        
        if len(data) == 5000:
            args_str = ','.join(cur.mogrify("(%s, %s, ST_GeomFromText(%s, 4326))", x).decode("utf-8") for x in data)
            cur.execute(insert_query % args_str)
            data = []
            print(f"  Inserted {i+1} rows...")
            
    if data:
        args_str = ','.join(cur.mogrify("(%s, %s, ST_GeomFromText(%s, 4326))", x).decode("utf-8") for x in data)
        cur.execute(insert_query % args_str)
        
    print("Creating GIST index on geom...")
    cur.execute("CREATE INDEX idx_osm_pois_geom ON osm_pois USING GIST(geom);")
    
    print("Analyzing table...")
    cur.execute("ANALYZE osm_pois;")
    
    cur.close()
    conn.close()
    print("Database setup complete.")

def benchmark():
    conn = psycopg2.connect(**DB_PARAMS)
    cur = conn.cursor()
    
    latencies = []
    
    print("\nRunning Benchmark: Find cafes within 1km of random points...")
    for i in range(100):
        lon = random.uniform(106.6, 107.0)
        lat = random.uniform(-6.4, -6.1)
        
        # We want to find cafes within 1000 meters.
        # Since geom is 4326 (lat/lon), ST_DWithin with geography cast is the best way for meters.
        query = """
            SELECT count(*) 
            FROM osm_pois 
            WHERE category = 'cafe' 
            AND ST_DWithin(geom::geography, ST_SetSRID(ST_MakePoint(%s, %s), 4326)::geography, 1000);
        """
        
        start_time = time.time()
        cur.execute(query, (lon, lat))
        res = cur.fetchone()[0]
        elapsed = (time.time() - start_time) * 1000
        latencies.append(elapsed)
        
    print("\n=== BENCHMARK RESULTS ===")
    print(f"Total queries: {len(latencies)}")
    print(f"Avg Latency: {statistics.mean(latencies):.2f} ms")
    print(f"Min Latency: {min(latencies):.2f} ms")
    print(f"Max Latency: {max(latencies):.2f} ms")
    print(f"P50 Latency: {statistics.median(latencies):.2f} ms")
    print(f"P95 Latency: {statistics.quantiles(latencies, n=20)[18]:.2f} ms")
    
    cur.close()
    conn.close()

if __name__ == '__main__':
    setup_db()
    benchmark()
