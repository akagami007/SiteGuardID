# Market Research v0.1

Status: draft desk research. Angka pasar yang belum punya sumber ditandai `[PERLU DATA]`. Tidak ada angka yang dikarang.

## 1. Pertanyaan riset

Dokumen ini harus menjawab tiga hal sebelum ada kode produksi:

| ID | Pertanyaan | Cara menjawab | Status |
|----|-----------|---------------|--------|
| RQ-1 | Apakah orang benar-benar kehilangan uang karena salah pilih lokasi sewa? | Wawancara (discovery-plan.md), cerita kerugian konkret dengan nominal | Belum |
| RQ-2 | Apa yang mereka lakukan hari ini sebelum tanda tangan sewa, dan berapa lama/biayanya? | Wawancara + observasi | Belum |
| RQ-3 | Siapa yang mau membayar, berapa, dan seberapa sering keputusan ini terjadi? | Wawancara + uji harga (fake door / pre-order laporan) | Belum |

## 2. Problem statement

Pelaku usaha yang akan menyewa tempat usaha mengambil keputusan bernilai puluhan sampai ratusan juta rupiah (sewa tahunan dibayar di muka, deposit, renovasi, peralatan) berdasarkan survei lapangan singkat, intuisi, dan informasi dari pemilik/agen properti yang punya kepentingan agar sewa terjadi.

Informasi yang relevan untuk keputusan itu tersedia tapi tersebar:

- Risiko bencana: InaRISK BNPB.
- Cuaca operasional: BMKG.
- Statistik wilayah: BPS.
- Tata ruang dan perizinan: OSS RBA, RDTR Interaktif.
- Kepadatan fasilitas dan kompetitor: OpenStreetMap, Google Maps (manual).
- Kelayakan finansial: spreadsheet pribadi, kalau ada.

Tidak ada langkah yang menggabungkan semuanya menjadi satu jawaban untuk pertanyaan: **"Untuk usaha X dengan modal Y, apakah saya harus menyewa tempat ini?"**

Hipotesis kerugian: kesalahan yang paling mahal bukan lokasi yang kurang ramai, tapi kombinasi sewa yang terlalu berat terhadap omzet realistis, modal yang habis sebelum break-even, dan risiko (banjir, zonasi) yang baru ketahuan setelah uang keluar. Hipotesis ini belum divalidasi.

## 3. Konteks pasar Indonesia

| Topik | Temuan | Sumber | Status |
|-------|--------|--------|--------|
| Jumlah UMKM | `[PERLU DATA]` Angka yang sering dikutip ada di kisaran puluhan juta unit, mayoritas usaha mikro. Usaha mikro informal umumnya tidak menyewa ruko. Segmen relevan adalah usaha kecil/menengah yang menyewa tempat. | Kemenkop UKM, BPS | Perlu angka resmi terbaru dan proporsi usaha yang menyewa tempat |
| Sensus Ekonomi 2026 | Pencacahan lapangan 15 Juni s/d 31 Agustus 2026, tahap online 1 Mei s/d 31 Juli 2026. Tanggal rilis hasil belum diumumkan. | Kompas, Beritasatu, sensus.bps.go.id | Terverifikasi (jadwal). Hasil belum tersedia |
| OSS RBA | Menyediakan informasi lokasi usaha, RDTR Interaktif, KKPR, persyaratan dasar. Berbasis risiko. | oss.go.id | Terverifikasi (fitur publik) |
| Akses data RDTR untuk integrasi | Layanan ArcGIS REST GISTARU dilaporkan tidak lagi publik. Integrasi resmi lewat permohonan ke ATR/BPN. | Artikel komunitas GIS | Perlu konfirmasi langsung ke ATR/BPN |
| Location intelligence lokal | Sudah ada pemain: MAPID (site selection enterprise), GeoZMap (scoring lokasi, peta kompetitor), DekatLokasi, Ruko Ruko. Konsultan properti besar (CBRE) punya platform internal. | Lihat competitor-analysis.md | Fitur detail belum diuji langsung |
| Harga sewa ruko | `[PERLU DATA]` Rentang harga sewa per wilayah Jabodetabek. Bisa diambil dari listing marketplace sebagai referensi negosiasi (Phase 2). | Rumah123, 99.co, OLX | Belum |
| Tingkat kegagalan usaha karena lokasi | `[PERLU DATA]` Tidak ditemukan statistik Indonesia yang kredibel. Jangan pakai angka luar negeri sebagai klaim pemasaran. | | Kosong. Jangan diisi asumsi |

## 4. Segmen dan beachhead

| Segmen | Nilai keputusan | Frekuensi keputusan | Kemampuan bayar | Akses (go-to-market) | Penilaian |
|--------|----------------|---------------------|-----------------|---------------------|-----------|
| A. First-time founder UMKM | Tinggi relatif terhadap modal | Sekali, jarang | Rendah s/d sedang | Sulit, tersebar | Nyeri paling besar, monetisasi paling lemah |
| B. Pemilik UMKM buka cabang ke-2/ke-3 | Tinggi | Beberapa kali dalam beberapa tahun | Sedang | Komunitas usaha, asosiasi | **Beachhead yang direkomendasikan** |
| C. Mitra franchise (franchisee) | Tinggi, sering ada persyaratan lokasi dari franchisor | Sekali s/d beberapa kali | Sedang | Lewat franchisor, pameran waralaba | Kuat, bisa dijangkau lewat B2B2C |
| D. Franchisor / tim ekspansi | Sangat tinggi, banyak titik | Rutin | Tinggi | Penjualan langsung | Phase 4, tapi uji minat sejak discovery |
| E. Agen/konsultan properti komersial | Tidak langsung (alat bantu jual) | Rutin | Sedang | Langsung | Konflik kepentingan: laporan NO-GO merugikan agen. Hati-hati |
| F. Bank / lembaga pembiayaan UMKM | Risiko kredit | Rutin | Tinggi | Penjualan enterprise panjang | Phase 4 |

Alasan memilih B (dan C sebagai sekunder): mereka sudah pernah menyewa sekali, jadi tahu biaya salah pilih dari pengalaman sendiri, punya data omzet nyata dari outlet pertama (input finansial jauh lebih realistis), dan keputusan berulang membuka model langganan ringan.

## 5. Hipotesis nilai yang akan diuji

| ID | Hipotesis | Sinyal benar | Sinyal salah |
|----|-----------|-------------|--------------|
| H-1 | Pengguna B/C pernah hampir atau sudah rugi karena keputusan lokasi | >= 3 dari 5 responden bisa menyebut kejadian spesifik dengan nominal | Jawaban umum, tanpa kejadian |
| H-2 | Bagian finansial (capital gap, break-even, transaksi/hari) lebih bernilai daripada peta | Responden mengubah penilaian setelah melihat angka finansial | Responden hanya tertarik peta dan skor |
| H-3 | Evidence dengan sumber resmi menaikkan kepercayaan | Responden membuka panel evidence dan menyebut sumbernya saat menjelaskan keputusan | Evidence diabaikan |
| H-4 | Ada kesediaan bayar per laporan | >= 2 dari 5 bersedia pre-order laporan berikutnya | Semua hanya mau gratis |
| H-5 | Laporan dipakai untuk diskusi dengan pihak lain (pasangan, partner, investor, franchisor) | Responden menyebut pihak spesifik | Keputusan sepenuhnya personal tanpa dokumen |

## 6. Risiko pasar

| Risiko | Penjelasan | Mitigasi |
|--------|-----------|----------|
| Frekuensi rendah | Due diligence sewa terjadi jarang per pengguna | Beachhead B/C, B2B untuk franchisor |
| Pengguna sudah terlanjur memutuskan | Banyak orang mencari pembenaran, bukan analisis | Posisikan sebagai alat negosiasi juga (Phase 2: rekomendasi harga sewa maksimal) |
| Kompetitor menambah modul finansial | MAPID/GeoZMap bisa menambah kalkulator | Kedalaman evidence + knockout logic + workflow sebelum sewa, bukan fitur kalkulator |
| Data publik tidak cukup granular | OSM tidak lengkap untuk UMKM kecil, BPS level kab/kota | Confidence score dan status UNKNOWN ditampilkan jujur |
| Tanggung jawab hukum | Pengguna rugi lalu menyalahkan laporan | Disclaimer, bahasa "decision support", bukan nasihat hukum/investasi |

## 7. Deliverable discovery berikutnya

- `problem-statement.md` versi tervalidasi (setelah wawancara).
- Persona tervalidasi menggantikan proto-persona di PRD.
- Angka `[PERLU DATA]` di §3 terisi dengan sumber.
