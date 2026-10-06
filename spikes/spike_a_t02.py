import urllib.request
import urllib.parse
import json
import time
import ssl

# Spike A-T02: InaRISK batas_administrasi to BMKG adm4
INARISK_URL = "https://gis.bnpb.go.id/server/rest/services/inarisk/batas_administrasi/MapServer/identify"
BMKG_URL = "https://api.bmkg.go.id/publik/prakiraan-cuaca"

points = [
    {"name": "Monas (JakPus)", "lat": -6.1754, "lon": 106.8272},
    {"name": "Kemang (JakSel)", "lat": -6.2625, "lon": 106.8141},
    {"name": "Margonda (Depok)", "lat": -6.3725, "lon": 106.8322},
    {"name": "BSD (TangSel)", "lat": -6.2941, "lon": 106.6622},
    {"name": "Summarecon (Bekasi)", "lat": -6.2223, "lon": 107.0016}
]

def check_inarisk(pt):
    geometry = {
        "x": pt["lon"],
        "y": pt["lat"],
        "spatialReference": {"wkid": 4326}
    }
    params = {
        "geometry": json.dumps(geometry),
        "geometryType": "esriGeometryPoint",
        "layers": "all:4", # Layer 4 = Batas Desa
        "tolerance": 1,
        "mapExtent": f"{pt['lon']-0.01},{pt['lat']-0.01},{pt['lon']+0.01},{pt['lat']+0.01}",
        "imageDisplay": "800,600,96",
        "returnGeometry": "false",
        "f": "json"
    }
    
    query_string = urllib.parse.urlencode(params)
    url = f"{INARISK_URL}?{query_string}"
    
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req, timeout=10, context=ctx) as response:
        return json.loads(response.read().decode())

def check_bmkg(adm4):
    url = f"{BMKG_URL}?adm4={adm4}"
    
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE
    
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=10, context=ctx) as response:
            data = json.loads(response.read().decode())
            return {"success": True, "data": data}
    except urllib.error.HTTPError as e:
        return {"success": False, "status": e.code}
    except Exception as e:
        return {"success": False, "error": str(e)}

def format_adm4(code):
    # Kemendagri format is typically XX.XX.XX.XXXX
    # If the code is 10 digits without dots (XXXXXXXXXX)
    if code and len(code) == 10 and '.' not in code:
        return f"{code[0:2]}.{code[2:4]}.{code[4:6]}.{code[6:10]}"
    return code

def main():
    print("Executing Spike A-T02: InaRISK batas_administrasi vs BMKG adm4\n")
    
    for i, pt in enumerate(points):
        print(f"--- Point: {pt['name']} ---")
        try:
            res = check_inarisk(pt)
            results = res.get('results', [])
            if not results:
                print("  InaRISK: No results found for this point.")
                continue
                
            attr = results[0].get('attributes', {})
            desa = attr.get('NAMOBJ', 'Unknown')
            iddesa = attr.get('IDDESA', '')
            kdepum = attr.get('KDEPUM', '')
            kdebps = attr.get('KDEBPS', '')
            
            print(f"  InaRISK Desa: {desa}")
            print(f"  InaRISK IDDESA: {iddesa}")
            print(f"  InaRISK KDEPUM: {kdepum}")
            print(f"  InaRISK KDEBPS: {kdebps}")
            
            candidates = set([iddesa, kdepum, kdebps])
            candidates = {c for c in candidates if c and len(c) >= 10}
            
            # Also try formatting to XX.XX.XX.XXXX if not already
            formatted_candidates = set()
            for c in candidates:
                formatted_candidates.add(c)
                fmt = format_adm4(c)
                if fmt != c:
                    formatted_candidates.add(fmt)
                    
            if not formatted_candidates:
                print("  No valid code candidates found from InaRISK attributes.")
                continue
                
            bmkg_success = False
            for c in formatted_candidates:
                print(f"  -> Testing BMKG with adm4={c} ...")
                bmkg_res = check_bmkg(c)
                if bmkg_res["success"]:
                    lokasi = bmkg_res["data"].get("lokasi", {})
                    lok_desa = lokasi.get("desa", "Unknown")
                    print(f"     [OK] BMKG matched! Desa di BMKG: {lok_desa}")
                    bmkg_success = True
                    break
                else:
                    err = bmkg_res.get("status", bmkg_res.get("error"))
                    print(f"     [FAIL] {err}")
                    
            if not bmkg_success:
                print("  -> RESULT: No BMKG match found for any candidate codes.")
                
        except Exception as e:
            print(f"  Error: {e}")
            
if __name__ == '__main__':
    main()
