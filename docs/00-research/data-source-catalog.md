# Data Source Catalog v0.1

Verification date: 2026-10-06.

Verification levels:

- **LIVE**: endpoint called directly and returned valid data on the verification date.
- **DOCS**: confirmed from official documentation or official portal text, not called.
- **REPORTED**: only third-party reports. Must be confirmed before relying on it.
- **UNVERIFIED**: assumption.

## 1. Summary

| ID | Source | Data used | Access | Verification | Granularity | Freshness | Commercial use | Dependency risk |
|----|--------|-----------|--------|--------------|-------------|-----------|----------------|-----------------|
| DS-01 | BMKG Prakiraan Cuaca | 3-day forecast, 3h interval: temp, humidity, rain (tp), cloud, wind, visibility | Public JSON, no key | LIVE | Kelurahan/desa (`adm4`) | Updated 2x daily | Allowed with mandatory attribution (DOCS) | Low |
| DS-02 | BNPB InaRISK (ArcGIS REST) | Hazard index rasters: flood, flash flood, earthquake, landslide, extreme weather, liquefaction, volcano, drought, forest fire | Public ArcGIS REST, no key | LIVE (service directory) | Raster pixel (resolution TBD) | Dataset-dependent, infrequent | **UNVERIFIED** | Medium |
| DS-03 | BNPB DIBI (via InaRISK) | Historical hydro-meteorological disaster events 2015 to 2024 | ArcGIS MapServer | LIVE (listed) | Event / admin area (TBD) | Periodic | UNVERIFIED | Medium |
| DS-04 | BNPB INARISKPOP_2020 | Population raster (estimate population within radius) | ArcGIS ImageServer | LIVE (listed) | Raster | Static (2020) | UNVERIFIED | Medium |
| DS-05 | BPS Web API | Population, density, regional GDP per capita, expenditure per capita, employment | REST, API key per app | DOCS | Mostly kab/kota, some kecamatan | Dataset-dependent (yearly) | Public statistics, attribution expected (confirm terms) | Medium |
| DS-06 | OpenStreetMap (Geofabrik Indonesia extract) | POI, roads, transit, schools, markets, worship places, competitors by tag | Self-imported `.osm.pbf` into PostGIS | DOCS | Feature-level | Daily extracts; we refresh weekly | ODbL, attribution required. Share-alike applies to derived databases if distributed | Medium (coverage gaps for small UMKM) |
| DS-07 | OpenFreeMap | Vector basemap tiles for MapLibre | Public, no key | DOCS | Tiles | Weekly | Allowed, no SLA | Low (fallback: self-host) |
| DS-08 | OSS RBA / RDTR Interaktif | Zoning (RDTR), KKPR, business licensing requirements by KBLI | Web UI only for public | DOCS (UI) | Parcel | Varies by region | N/A (we link out, do not scrape) | **High** |
| DS-09 | GISTARU ATR/BPN (ArcGIS REST) | RDTR polygons | Reported closed / credential required | REPORTED | Parcel | Varies | Requires official request | **High** |
| DS-10 | Admin boundaries (kode wilayah Kemendagri) | Point to `adm4` code lookup for BMKG and BPS joins | Candidate: `inarisk/batas_administrasi` MapServer, or BIG boundary dataset | LIVE (service listed), code format UNVERIFIED | Desa/kelurahan | Rarely changes | UNVERIFIED | Medium |
| DS-11 | User input | Rent, deposit, renovation, equipment, capital, revenue target, margin, fixed cost, avg ticket, lease term | Form | N/A | Property | Per analysis | N/A | Accuracy risk: user optimism bias |

## 2. Source details

### DS-01 BMKG

- Endpoint: `GET https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4={kode}`
- Live check: `adm4=36.74.05.1001` returned Cempaka Putih, Ciputat Timur, Kota Tangerang Selatan, with `lat`, `lon`, and `cuaca[][]` entries containing `t`, `hu`, `tp`, `tcc`, `ws`, `wd`, `vs`, `weather_desc`, `local_datetime`, `analysis_date`.
- Rate limit: 60 requests/minute/IP.
- Attribution: must display BMKG as the source in the app.
- Use for: operational weather signal (rain hours in forecast window, heat). Not a demand predictor.
- Limitation: 3-day forecast says nothing about seasonal flood risk. Historical climate is out of MVP scope.
- Required dependency: lat/lng to `adm4` mapping (DS-10).
- TTL: 3 hours.

### DS-02 to DS-04 BNPB InaRISK

- Base: `https://gis.bnpb.go.id/server/rest/services/inarisk` (ArcGIS Enterprise 11.4).
- Services seen (partial list): `INDEKS_BAHAYA_BANJIR` (ImageServer), `INDEKS_BAHAYA_BANJIRBANDANG`, `INDEKS_BAHAYA_GEMPABUMI`, `INDEKS_BAHAYA_TANAHLONGSOR_JBTBPJ` (MapServer), `INDEKS_BAHAYA_CUACAEKSTRIM`, `INDEKS_BAHAYA_LIKUEFAKSI`, `INDEKS_BAHAYA_GUNUNGAPI`, `INDEKS_BAHAYA_KEKERINGAN`, `INDEKS_BAHAYA_KARHUTLA`, `DIBI_Hidromet_2015_2024`, `INARISKPOP_2020`, `batas_administrasi`, `Faults`.
- Point query pattern (to verify in spike A-T01):
  `GET .../INDEKS_BAHAYA_BANJIR/ImageServer/identify?geometry={"x":lng,"y":lat,"spatialReference":{"wkid":4326}}&geometryType=esriGeometryPoint&returnGeometry=false&f=json`
- Unknowns to resolve in spike:
  - Pixel value range and class thresholds (low/medium/high) as defined by BNPB.
  - Raster resolution.
  - Dataset vintage (shown in service metadata?).
  - Terms of use for commercial products. Action: written request to BNPB/Pusdatinkom.
- Radius handling: sample the point plus N points on the radius ring, or use `computeStatisticsHistograms` over a polygon. Decide after spike.
- TTL: 30 days (hazard index), 7 days (DIBI).

### DS-05 BPS Web API

- Portal: `https://webapi.bps.go.id/developer` (register, create application, get key).
- MVP indicators (kab/kota): population, population density, GRDP per capita, average monthly per-capita expenditure, open unemployment rate.
- Granularity warning: do not present kab/kota statistics as if they describe a 1 km radius. UI label: "Konteks wilayah (Kota Tangerang Selatan)".
- TTL: 7 days for lookups, dataset values cached until a newer period exists.

### DS-06 OpenStreetMap

- Do **not** use public Overpass (`overpass-api.de`) or public Nominatim as a production backend. Their policies direct commercial or app-backend usage to self-hosted or paid instances. Nominatim forbids autocomplete on the public server.
- Pipeline: download `indonesia-latest.osm.pbf` (Geofabrik) weekly, clip to MVP region (Jabodetabek bbox), import with `osm2pgsql` flex output into `osm_pois` and `osm_roads`.
- Competitor mapping: `business_types.osm_competitor_tags` (e.g. laundry: `shop=laundry`, `shop=dry_cleaning`; cafe: `amenity=cafe`). Exact tag lists to be confirmed by sampling.
- Coverage warning: small Indonesian businesses are under-mapped in OSM. Competitor count is a **lower bound**. Confidence for competitor factor must reflect this.
- Attribution: "© OpenStreetMap contributors" on map and report.

### DS-08, DS-09 RDTR / OSS

- MVP behavior: the regulatory engine does not compute zoning compliance. It produces:
  1. Checklist by business type (KBLI to verify, risk level to check, documents).
  2. Direct link and instructions for the user to check the location in OSS RDTR Interaktif.
  3. A manual verification field where the user records the result (with screenshot upload in Phase 2).
- Phase 2: `RegulatoryProvider` adapters for imported GeoJSON where a municipality publishes RDTR openly, or official data access from ATR/BPN.

## 3. Freshness and TTL policy

| Source | Cache TTL | Stale threshold (shown as warning) | Hard expiry (factor becomes UNKNOWN) |
|--------|-----------|------------------------------------|--------------------------------------|
| BMKG | 3 h | 12 h | 24 h |
| InaRISK hazard index | 30 d | 180 d | none (static dataset, show vintage) |
| DIBI events | 7 d | 90 d | none |
| BPS | 7 d | period older than 2 years | none (show period) |
| OSM import | 7 d | 30 d | 90 d |
| Admin boundary | 90 d | 365 d | none |

## 4. Attribution block (UI footer and report)

```
Sumber data: BMKG (prakiraan cuaca), BNPB InaRISK (indeks bahaya), BPS (statistik wilayah),
© OpenStreetMap contributors, peta dasar OpenFreeMap / OpenMapTiles.
Informasi regulasi bersifat panduan dan wajib diverifikasi di OSS RBA.
```

## 5. Spikes required before build

| ID | Spike | Exit criterion |
|----|-------|----------------|
| A-T01 | InaRISK identify on 20 known Jabodetabek points (including known flood areas) | Pixel values returned, classes mapped, latency measured |
| A-T02 | Point to `adm4` via `batas_administrasi`, compare code with BMKG `adm4` | 20/20 codes match BMKG format |
| A-T03 | Laravel Cloud Postgres: `CREATE EXTENSION postgis`, GIST index, `ST_DWithin` on 100k POIs | Query p95 under 200 ms |
| A-T04 | osm2pgsql import of Jabodetabek clip, POI counts per category | Counts sanity-checked against 3 manual field samples |
| A-T05 | BPS API: fetch 5 MVP indicators for all Jabodetabek kab/kota | All values with period and source table ID |
