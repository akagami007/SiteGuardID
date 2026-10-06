import requests
import json
import os

# Spike A-T05: BPS Web API Integration (Market Engine)
# Usage: Set BPS_API_KEY environment variable before running.
# export BPS_API_KEY="your_api_key_here"

BPS_API_KEY = os.environ.get("BPS_API_KEY", "YOUR_API_KEY")
BASE_URL = "https://webapi.bps.go.id/v1/api"

# Daftar Indikator MVP (ID indikator BPS dapat berbeda-beda per jenis data,
# ID di bawah ini hanya contoh representatif. Perlu mencari ID tabel/indikator 
# yang tepat di portal BPS untuk populasi, PDRB per kapita, dll.)
# Domain 3174 = Jakarta Selatan
DOMAIN = "3174" 

# Contoh mencari ketersediaan data indikator (List)
def fetch_bps_indicators():
    print(f"Mengambil daftar indikator dari BPS API untuk domain {DOMAIN}...")
    
    url = f"{BASE_URL}/list/model/indicator/domain/{DOMAIN}/key/{BPS_API_KEY}/"
    
    try:
        response = requests.get(url, timeout=10)
        
        # BPS API sering mengembalikan 401 jika key salah/tidak ada
        if response.status_code == 401:
            print("[FAIL] API Key BPS tidak valid atau tidak diatur. Tidak dapat memvalidasi data.")
            return
            
        response.raise_for_status()
        data = response.json()
        
        if data.get("data-availability") == "available":
            indicators = data.get("data", [][1]) # list of indicators
            print(f"[OK] Berhasil terhubung ke BPS API. Ditemukan {len(indicators[1])} indikator.")
            print("\nContoh Indikator yang tersedia:")
            for ind in indicators[1][:5]:
                print(f" - ID: {ind.get('indicator_id')}, Nama: {ind.get('title')}")
                
        else:
            print("[FAIL] Data tidak tersedia untuk domain ini.")
            
    except Exception as e:
        print(f"Error mengakses BPS API: {e}")

def main():
    print("Executing Spike A-T05: BPS API")
    if BPS_API_KEY == "YOUR_API_KEY":
        print("[INFO] API Key belum diatur. Script akan gagal dengan 401 Unauthorized.")
        print("[INFO] Untuk menjalankan dengan benar: export BPS_API_KEY='key_anda' && python3 spike_a_t05.py\n")
        
    fetch_bps_indicators()

if __name__ == '__main__':
    main()
