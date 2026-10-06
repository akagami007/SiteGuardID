# Assumptions Register v0.1

Setiap asumsi punya cara uji dan status. Status: `OPEN`, `VALIDATED`, `INVALIDATED`, `PARTIAL`.

## 1. Pengguna dan bisnis

| ID | Asumsi | Risiko jika salah | Cara uji | Status |
|----|--------|-------------------|----------|--------|
| A-U01 | Pemilik UMKM yang membuka cabang pernah rugi atau hampir rugi karena keputusan lokasi | Tidak ada problem yang cukup nyeri | Wawancara problem, H-1 | OPEN |
| A-U02 | Pengguna mau mengisi 10 s/d 15 angka finansial | Drop-off di wizard | Uji prototype, completion rate | OPEN |
| A-U03 | Pengguna beachhead punya angka omzet dan transaksi nyata dari outlet pertama | Input terlalu optimistis, hasil menyesatkan | Wawancara | OPEN |
| A-U04 | Keputusan NO-GO yang jujur dihargai, bukan membuat pengguna pergi | Retensi rendah | Uji prototype, reaksi terhadap NO-GO | OPEN |
| A-U05 | Laporan dipakai untuk diskusi dengan pihak lain | Fitur laporan/share kurang bernilai | Wawancara, H-5 | OPEN |
| A-B01 | Ada kesediaan bayar per laporan | Tidak ada model bisnis B2C | Fake door + pre-order, H-4 | OPEN |
| A-B02 | Franchisor tertarik pada analisis bulk | Tidak ada jalur B2B | 2 s/d 3 percakapan dengan franchisor saat discovery | OPEN |
| A-B03 | Jabodetabek cukup untuk validasi | Sampel tidak representatif | Diterima sebagai batasan sadar | OPEN |

## 2. Data dan teknis

| ID | Asumsi | Risiko jika salah | Cara uji | Status |
|----|--------|-------------------|----------|--------|
| A-T01 | InaRISK ImageServer `identify` mengembalikan nilai indeks per titik dengan latensi wajar | Hazard engine tidak bisa berjalan otomatis | Spike: 20 titik Jabodetabek | **VALIDATED** (100% success, Avg ~100ms, P95 ~240ms. Note: some points return `NoData` which likely means safe/out of zone, need radius query to avoid false negatives) |
| A-T02 | `inarisk/batas_administrasi` menghasilkan kode desa yang sama dengan `adm4` BMKG | Weather engine tidak bisa dipetakan | Spike: 20 titik, bandingkan kode | **VALIDATED** (Atribut `KDEPUM` dari Layer 4 InaRISK cocok sempurna 100% dengan parameter `adm4` API BMKG) |
| A-T03 | Laravel Cloud Postgres mendukung PostGIS dengan performa cukup | Harus pindah ke penyedia DB lain (mis. managed Postgres lain) | Spike: extension + GIST + `ST_DWithin` | **VALIDATED** (Test 100k POI dengan `ST_DWithin` menghasilkan rata-rata ~70ms, P95 ~67ms, max <200ms pada kondisi warm cache) |
| A-T04 | OSM Jabodetabek cukup untuk sinyal POI dan kompetitor | Faktor kompetitor menyesatkan | Spike: bandingkan dengan 3 sampel lapangan | **PARTIAL** (Infrastruktur DB PostGIS sanggup, tapi Overpass API menolak koneksi via bot. Kelengkapan POI harus divalidasi visual dengan sampel lapangan nanti) |
| A-T05 | BPS API menyediakan 5 indikator MVP untuk semua kab/kota Jabodetabek | Market engine kosong | Spike | OPEN |
| A-T06 | Pemakaian komersial data InaRISK diizinkan dengan atribusi | Harus mengganti sumber hazard | Surat/email ke BNPB | OPEN |
| A-T07 | GISTARU REST tidak tersedia untuk publik | Jika ternyata tersedia, regulatory engine bisa diotomasi lebih awal | Cek langsung + tanya ATR/BPN | PARTIAL (dilaporkan pihak ketiga) |

## 3. Ambang finansial (default rule set v0.1)

Ambang ini **bukan** benchmark industri. Ini titik awal yang dapat dikonfigurasi dan harus dikalibrasi dari wawancara dan data pengguna. UI menampilkannya sebagai "ambang default SiteGuard v0.1".

| ID | Parameter | Default | Dasar | Status |
|----|-----------|---------|-------|--------|
| A-F01 | Margin of safety minimum untuk tidak NO-GO | 10% | Logika: di bawah 10%, penurunan omzet kecil sudah membuat rugi | OPEN |
| A-F02 | Margin of safety untuk GO | >= 25% | Idem | OPEN |
| A-F03 | Rent-to-revenue: perhatian | > 15% | Belum ada sumber Indonesia. Perlu dikalibrasi per kategori | OPEN |
| A-F04 | Rent-to-revenue: red flag | > 25% | Idem | OPEN |
| A-F05 | Payback capex dibanding masa sewa | Payback > masa sewa = REVIEW | Logika: investasi belum kembali saat kontrak habis | OPEN |
| A-F06 | Cadangan kas operasional minimum setelah pra-buka | 3 bulan biaya tetap | Praktik umum perencanaan usaha. Perlu validasi | OPEN |
| A-F07 | Bobot dimensi | Financial 35, Market 30, Risk 20, Operational 15 | Regulatory dikeluarkan dari skor (ADR-005). Bobot awal, dikalibrasi setelah uji | OPEN |

## 4. Template asumsi kategori usaha

Default per kategori (avg ticket, gross margin, biaya tetap non-sewa, hari operasional) **belum diisi**. Akan diisi dari wawancara pemilik usaha nyata. Sampai terisi, wizard meminta pengguna mengisi sendiri dan tidak menampilkan angka default yang dikarang.
