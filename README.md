# 🛡️ SiteGuard ID

**"Jangan bayar deposit sebelum Anda yakin 100%."**

SiteGuard ID adalah *Business Site Due Diligence Platform* pertama di Indonesia yang dirancang khusus untuk pelaku UMKM (F&B, Retail, Laundry). Platform ini membantu calon penyewa ruko/tempat usaha untuk mengevaluasi kelayakan lokasi secara data-driven berdasarkan Risiko Bencana (InaRISK), Kepadatan Kompetitor (OpenStreetMap + PostGIS), dan Kalkulasi Margin Keamanan (Financials).

Bukan sekadar *tools* pemetaan, SiteGuard ID memberikan satu keputusan akhir yang tegas: **GO**, **REVIEW**, atau **NO-GO**.

---

## 🎯 Mengapa SiteGuard ID? (Business Value)
1. **Mencegah Sunk Cost:** Membantu UMKM menghindari kerugian ratusan juta akibat salah pilih lokasi ruko.
2. **Leverage Negosiasi:** Laporan yang dihasilkan dapat dicetak (PDF) dan digunakan sebagai argumen berbasis data untuk menawar harga sewa ke pemilik properti.
3. **Data Instan & Real-time:** Analisis spasial kepadatan pesaing (500m & 2km) dilakukan dalam <100ms berkat arsitektur PostGIS lokal.

---

## 🏗️ Arsitektur Teknologi

Kami menggunakan pendekatan **Headless Architecture** untuk memisahkan logika berat (kalkulasi spasial) dengan pengalaman interaktif pengguna (UI).

* **Frontend:** Next.js 15 (App Router), React, Tailwind CSS, Leaflet (React-Leaflet).
* **Backend:** Laravel 11 (API-only).
* **Database:** PostgreSQL + ekstensi PostGIS (untuk kueri geospasial `ST_DWithin`).
* **Data Sources:** OpenStreetMap (via Overpass API) untuk POI kompetitor. *(Future: InaRISK BNPB & BMKG)*.

---

## 🚀 Panduan Instalasi (Development Setup)

Repositori ini terbagi menjadi dua folder utama: `siteguard-api` dan `siteguard-web`. Ikuti langkah-langkah di bawah ini untuk menjalankan aplikasi secara lokal.

### Prasyarat Sistem
* PHP 8.2+ & Composer
* Node.js 20+ & npm
* Docker & Docker Compose (Untuk menjalankan PostgreSQL + PostGIS)

### Langkah 1: Setup Database (PostGIS)
Kami menggunakan Docker agar instalasi ekstensi spasial menjadi instan.
```bash
cd spikes
docker compose up -d
```
*Ini akan menjalankan kontainer PostgreSQL dengan PostGIS di `127.0.0.1:5433`.*

### Langkah 2: Setup Backend (Laravel API)
```bash
cd siteguard-api

# Install dependensi
composer install

# Copy environment
cp .env.example .env

# Generate App Key
php artisan key:generate

# Jalankan Migrasi Database
php artisan migrate:fresh

# [OPSIONAL] Karena Overpass API publik sering kena limit (504), 
# gunakan Seeder ini untuk menanamkan 200 data tiruan di area Kemang untuk testing UI.
php artisan db:seed --class=OsmPoiSeeder

# Jalankan Backend Server (Berjalan di http://127.0.0.1:8000)
php artisan serve
```

### Langkah 3: Setup Frontend (Next.js)
Buka terminal/tab baru dan jalankan:
```bash
cd siteguard-web

# Install dependensi
npm install

# Jalankan Frontend Server
npm run dev
```

---

## 💻 Cara Menggunakan MVP (Uji Coba)

1. Buka browser dan arahkan ke `http://localhost:3000`.
2. Di **Langkah 1 (Lokasi)**, geser pin peta ke area **Kemang, Jakarta Selatan**. (Jika Anda menggunakan `OsmPoiSeeder`, data pesaing tersimulasi padat di area ini).
3. Di **Langkah 2 & 3**, biarkan angka finansial bawaan atau ubah sesuai selera (Anda bisa mengklik *Gunakan Standar Industri*).
4. Klik **Analisis Kelayakan**.
5. Sistem akan mengirim kueri spasial ke Laravel, menghitung margin, dan merender **Dashboard Hasil** dengan animasi. Cobalah bandingkan hasil *GO* (area sepi pesaing) dan *REVIEW* (area Kemang yang padat).

---

## 🛣️ Roadmap Selanjutnya (Menuju Peluncuran)

- [ ] **Integrasi API InaRISK (BNPB):** Mengganti skor bencana yang statis dengan tarikan data *polygon* banjir & gempa bumi nyata.
- [ ] **Otomatisasi Cron Job:** Mengatur agar Command `php artisan osm:import` berjalan setiap minggu di tengah malam untuk memperbarui data OSM se-Jabodetabek tanpa memberatkan Overpass.
- [ ] **Export ke PDF:** Menambahkan tombol cetak laporan (Menggunakan Puppeteer/DomPDF) untuk fitur *Negotiation Leverage*.
- [ ] **Autentikasi User (Opsional):** Menggunakan Laravel Sanctum agar pengguna bisa melihat riwayat laporan di *dashboard* pribadi.
