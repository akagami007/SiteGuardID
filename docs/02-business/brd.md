# Business Requirements Document (BRD) v0.1

| Item | Nilai |
|------|-------|
| Produk | SiteGuard ID (nama kerja) |
| Versi | 0.1 draft |
| Tanggal | 2026-10-06 |
| Status | Pre-discovery. Belum disetujui |

## 01. Executive Summary

SiteGuard ID membantu pemilik usaha memeriksa satu tempat usaha kandidat sebelum membayar sewa dan deposit. Pengguna memasukkan lokasi, biaya sewa dan pra-buka, serta rencana bisnis. Sistem menggabungkan model finansial, data risiko bencana (BNPB), cuaca (BMKG), statistik wilayah (BPS), fasilitas dan kompetitor sekitar (OpenStreetMap), dan checklist perizinan (OSS), lalu memberi keputusan **GO / REVIEW / NO-GO** dengan bukti dan sumber.

Produk ini tidak bersaing di pencarian lokasi (MAPID, GeoZMap, dan lainnya sudah ada di sana). Produk ini mengisi langkah sesudahnya: memutuskan satu lokasi sebelum uang keluar.

## 02. Business Problem

Menyewa tempat usaha mengikat uang dalam jumlah besar di awal: sewa tahunan yang umumnya dibayar di muka, deposit, renovasi, dan peralatan. Keputusan ini biasanya diambil dengan:

- survei lapangan singkat,
- informasi dari pemilik atau agen yang diuntungkan bila sewa terjadi,
- perhitungan finansial seadanya, atau tidak ada sama sekali.

Data publik yang relevan tersedia tapi tersebar di beberapa portal pemerintah dan tidak terhubung ke rencana bisnis pengguna. Akibatnya kesalahan yang mahal (modal habis sebelum impas, sewa terlalu berat terhadap omzet realistis, risiko banjir atau zonasi yang tidak dicek) sering baru terlihat setelah kontrak ditandatangani. Besarnya kerugian ini di Indonesia belum terdokumentasi dan menjadi pertanyaan discovery utama (RQ-1).

## 03. Opportunity

- Data publik terbuka sudah cukup untuk sinyal awal: BMKG (JSON per kelurahan), InaRISK (ArcGIS REST), BPS (Web API), OSM (ODbL).
- Pemain location intelligence lokal berfokus pada pencarian dan skor lokasi, bukan keputusan sewa yang dikaitkan dengan modal dan rencana bisnis pengguna.
- OSS RBA dan RDTR Interaktif membuat verifikasi zonasi bisa dilakukan sendiri oleh pelaku usaha, tetapi banyak yang belum tahu harus mengecek apa. Checklist terpandu punya nilai meski belum otomatis.
- Sensus Ekonomi 2026 (pencacahan selesai Agustus 2026) berpotensi menambah data usaha berbasis wilayah setelah rilis. Ini peluang roadmap, bukan dasar MVP.

## 04. Market Context

Lihat [market-research.md](../00-research/market-research.md) dan [competitor-analysis.md](../00-research/competitor-analysis.md). Ringkasan:

- Kategori location intelligence sudah ramai. Klaim "belum ada aplikasi seperti ini" tidak berdasar.
- Celah yang dibidik: workflow due diligence satu properti, dengan model finansial dan logika knockout, evidence per faktor, dan status UNKNOWN yang jujur.
- Ukuran pasar (jumlah usaha yang menyewa tempat per tahun) belum diketahui. `[PERLU DATA]`

## 05. Target Users

| Prioritas | Segmen | Alasan |
|-----------|--------|--------|
| Primer (beachhead) | Pemilik UMKM yang membuka cabang ke-2 atau ke-3 di Jabodetabek | Pernah merasakan biaya salah pilih, punya data omzet nyata, keputusan berulang |
| Sekunder | Mitra / calon mitra franchise | Nilai keputusan tinggi, sering diminta justifikasi lokasi oleh franchisor |
| Diamati, belum dilayani | Franchisor dan tim ekspansi | Calon B2B Phase 4. Uji minat sejak discovery |
| Tidak ditargetkan MVP | First-time founder | Nyeri besar tapi frekuensi dan kemampuan bayar rendah. Boleh memakai versi gratis |
| Tidak ditargetkan MVP | Agen properti | Konflik kepentingan dengan keputusan NO-GO |

## 06. Business Goals

| ID | Tujuan | Ukuran (prototype) |
|----|--------|--------------------|
| BG-1 | Membuktikan problem nyata dan mahal | >= 3/5 responden menyebut kejadian kerugian/hampir rugi dengan nominal |
| BG-2 | Membuktikan hasil mengubah keputusan | >= 2/5 responden mengubah keputusan setelah melihat hasil |
| BG-3 | Membuktikan kesediaan bayar | >= 2/5 berkomitmen pada laporan berikutnya; fake-door click-through tercatat |
| BG-4 | Membuktikan biaya data per analisis rendah | Biaya API eksternal per analisis mendekati nol (data publik + cache + import lokal) |

## 07. Value Proposition

Untuk pemilik usaha yang sudah menemukan tempat dan hampir menyewa:

- **Tahu apakah modal cukup** sampai outlet buka dan bertahan beberapa bulan pertama.
- **Tahu target harian yang realistis**: berapa transaksi per hari agar impas, dibandingkan pengalaman outlet sebelumnya.
- **Tahu risiko yang bisa ditanyakan** ke pemilik ruko: indeks bahaya banjir dan bencana lain dari BNPB, dengan sumber.
- **Tahu apa yang harus dicek di OSS** sebelum tanda tangan.
- **Punya dokumen** untuk didiskusikan dengan partner, keluarga, atau franchisor.

## 08. Competitive Landscape

Lihat matrix di [competitor-analysis.md](../00-research/competitor-analysis.md). Pembeda yang ditargetkan: unit analisis satu properti plus rencana bisnis, knockout finansial, evidence trail, dan status UNKNOWN eksplisit.

## 09. Business Model (hipotesis)

| Tier | Isi | Harga | Status |
|------|-----|-------|--------|
| Gratis | Snapshot lokasi (peta, POI, hazard ringkas) + kalkulator finansial dasar | Rp0 | Hipotesis |
| Laporan lengkap | Keputusan, evidence lengkap, sensitivitas, PDF, share link | `[UJI HARGA]` per laporan | Diuji lewat fake door |
| Pro | Riwayat, perbandingan tak terbatas, portofolio kandidat | `[UJI HARGA]` per bulan | Phase 2 |
| Business | Bulk CSV, API, tim, white label | Kontrak | Phase 4 |

Harga tidak ditetapkan di v0.1. Titik harga diuji bervariasi saat discovery.

## 10. Scope (MVP)

- Wilayah: Jabodetabek.
- Kategori usaha: 3 (laundry, kafe kecil, minimarket/toko). Final setelah discovery.
- Input properti via pin peta, input finansial, radius 500 m / 1 km / 2 km.
- Engine: Location, Hazard (InaRISK + BMKG), Market (BPS kab/kota), Regulatory (checklist + verifikasi manual), Financial, Decision.
- Evidence per faktor, perbandingan 2 s/d 3 kandidat, laporan HTML/PDF, share link.
- Akun email, fake-door pembelian, product analytics.
- Web responsif (Next.js) + API (Laravel) + PostgreSQL/PostGIS.

## 11. Out of Scope (MVP)

Marketplace ruko, payment gateway, chat, fitur sosial, chatbot AI generik, scraping marketplace properti, aplikasi mobile native, multi-negara, model prediktif/ML, traffic real-time, loyalty, subscription billing, autocomplete alamat, otomasi kepatuhan RDTR, wilayah di luar Jabodetabek.

## 12. Risks

| ID | Risiko | Dampak | Kemungkinan | Mitigasi |
|----|--------|--------|-------------|----------|
| BRK-01 | Problem tidak cukup nyeri / tidak mau bayar | Tinggi | Sedang | Discovery dulu, kriteria stop jelas |
| BRK-02 | Data hazard tidak boleh dipakai komersial | Tinggi | Tidak diketahui | Konfirmasi tertulis ke BNPB sebelum monetisasi |
| BRK-03 | RDTR tidak bisa diotomasi | Sedang | Tinggi | Checklist + verifikasi manual, adapter untuk masa depan |
| BRK-04 | Pengguna menganggap laporan sebagai jaminan, lalu menuntut | Tinggi | Rendah s/d sedang | Disclaimer, bahasa decision support, ToS |
| BRK-05 | Input pengguna terlalu optimistis membuat hasil GO palsu | Tinggi | Tinggi | Sensitivitas wajib tampil, peringatan bila asumsi di luar rentang wajar |
| BRK-06 | OSM tidak lengkap membuat kompetitor terhitung rendah | Sedang | Tinggi | Label batas bawah, confidence rendah, input kompetitor manual (Phase 2) |
| BRK-07 | Kompetitor menambah modul finansial | Sedang | Sedang | Fokus pada workflow dan evidence, kumpulkan outcome data |
| BRK-08 | Layanan publik (OpenFreeMap, InaRISK) tidak tersedia | Sedang | Sedang | Cache, snapshot, fallback self-host tiles, status UNKNOWN |

## 13. Success Metrics

| Tahap | Metrik |
|-------|--------|
| Prototype | Lihat discovery-plan.md §4 |
| MVP live | Analysis completion rate, % analisis dengan >= 2 kandidat dibandingkan, report export rate, fake-door click rate, % pengguna kembali untuk kandidat berikutnya dalam 60 hari |
| Product-market signal | Jumlah pengguna yang membayar laporan kedua |

Tidak diukur sebagai metrik keberhasilan: page views, jumlah registrasi tanpa analisis.

## 14. Assumptions

Lihat [assumptions.md](../01-requirements/assumptions.md).

## 15. Constraints

- Tim kecil (diasumsikan 1 s/d 2 developer). Stack ditetapkan: Next.js, Laravel, PostgreSQL + PostGIS.
- Deployment: Vercel (web), Laravel Cloud (API, DB, queue). PostGIS di Laravel Cloud harus lolos spike A-T03.
- Hanya data publik dan input pengguna di MVP. Tidak ada data berbayar.
- Kepatuhan UU 27/2022 tentang Pelindungan Data Pribadi untuk data finansial pengguna.
- Wajib atribusi BMKG, OSM, dan sumber lain di UI dan laporan.
- Tidak boleh memakai server publik Overpass/Nominatim sebagai backend produksi.
