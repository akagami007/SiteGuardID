# Requirements v0.1

Konvensi ID:

- `BR-xx` business requirement (sumber: BRD)
- `FR-<AREA>-xx` functional requirement (sumber: PRD)
- `NFR-xx` non-functional requirement
- `US-xx` user story
- Prioritas: **M** = Must (MVP), **S** = Should (MVP jika waktu cukup), **C** = Could (Phase 2+)

## 1. Business requirements

| ID | Requirement | Prioritas |
|----|-------------|-----------|
| BR-01 | Produk memberikan keputusan GO / REVIEW / NO-GO untuk satu properti kandidat terhadap satu rencana usaha | M |
| BR-02 | Setiap keputusan dapat ditelusuri ke faktor, nilai, sumber, dan waktu pengambilan data | M |
| BR-03 | Ketiadaan atau kegagalan data tidak pernah diperlakukan sebagai kondisi aman | M |
| BR-04 | Kelayakan finansial (modal, break-even, sewa) menjadi bagian inti keputusan dan dapat membatalkan keputusan positif | M |
| BR-05 | Pengguna dapat membandingkan beberapa kandidat untuk rencana usaha yang sama | M |
| BR-06 | Hasil dapat dibagikan sebagai laporan ke pihak lain (partner, investor, franchisor) | M |
| BR-07 | Produk mengukur kesediaan bayar sejak prototype | M |
| BR-08 | Produk mematuhi atribusi dan ketentuan pemakaian setiap sumber data | M |
| BR-09 | Biaya data per analisis rendah dan tidak membebani layanan publik (cache, import lokal) | M |
| BR-10 | Produk tidak memberi nasihat hukum atau investasi; posisinya decision support | M |

## 2. Functional requirements

### 2.1 Profil usaha (PRF)

| ID | Requirement | Prioritas | BR |
|----|-------------|-----------|----|
| FR-PRF-01 | Pengguna memilih kategori usaha dari daftar MVP (laundry, kafe kecil, minimarket/toko). Setiap kategori membawa template asumsi default yang bisa diubah | M | BR-01, BR-04 |
| FR-PRF-02 | Pengguna mengisi modal awal tersedia, target omzet bulanan, gross margin (%), biaya tetap bulanan di luar sewa, rata-rata nilai transaksi, hari operasional per bulan | M | BR-04 |
| FR-PRF-03 | Pengguna dapat menandai apakah ada pembiayaan tambahan yang sudah pasti (nominal) | S | BR-04 |
| FR-PRF-04 | Sistem menampilkan rentang wajar setiap asumsi default beserta sumbernya, atau label "asumsi, perlu divalidasi" bila belum ada sumber | S | BR-02, BR-03 |

### 2.2 Properti kandidat (PRP)

| ID | Requirement | Prioritas | BR |
|----|-------------|-----------|----|
| FR-PRP-01 | Pengguna menentukan lokasi dengan pin di peta, atau menempel koordinat / link Google Maps yang berisi koordinat | M | BR-01 |
| FR-PRP-02 | Sistem menolak lokasi di luar wilayah MVP dengan pesan jelas | M | BR-03 |
| FR-PRP-03 | Pengguna mengisi sewa per tahun, skema bayar (tahunan di muka / bulanan), masa sewa (bulan), deposit, luas (m²), biaya renovasi, biaya peralatan, biaya lain pra-buka | M | BR-04 |
| FR-PRP-04 | Pengguna dapat memberi label dan catatan pada properti (mis. "Ruko Jl. X, lantai 1") | M | BR-05 |
| FR-PRP-05 | Pencarian alamat dengan autocomplete | C | |

### 2.3 Analisis (ANL)

| ID | Requirement | Prioritas | BR |
|----|-------------|-----------|----|
| FR-ANL-01 | Pengguna memilih radius 500 m / 1 km / 2 km. Default ditentukan kategori usaha | M | BR-01 |
| FR-ANL-02 | Analisis berjalan asinkron. UI menampilkan progres per sumber data (antre, berjalan, selesai, gagal, dari cache) | M | BR-02 |
| FR-ANL-03 | Analisis tetap selesai bila sebagian sumber gagal. Faktor dari sumber gagal berstatus UNKNOWN dengan alasan | M | BR-03 |
| FR-ANL-04 | Pengguna dapat menjalankan ulang analisis. Hasil lama disimpan (versi) | S | BR-02 |

### 2.4 Location intelligence (LOC)

| ID | Requirement | Prioritas | BR |
|----|-------------|-----------|----|
| FR-LOC-01 | Hitung jumlah POI per kelompok dalam radius: pendidikan, transit, ibadah, pasar/ritel, kantor, kesehatan, area permukiman (proxy) | M | BR-01 |
| FR-LOC-02 | Hitung kompetitor sesuai tag kategori usaha dalam radius, dan jarak kompetitor terdekat. Ditandai sebagai batas bawah (OSM tidak lengkap) | M | BR-01, BR-03 |
| FR-LOC-03 | Hitung jarak ke jalan terdekat per kelas (primary, secondary, tertiary) | M | BR-01 |
| FR-LOC-04 | Estimasi populasi dalam radius dari raster INARISKPOP_2020 (bergantung hasil spike A-T01) | S | BR-01 |

### 2.5 Hazard (HAZ)

| ID | Requirement | Prioritas | BR |
|----|-------------|-----------|----|
| FR-HAZ-01 | Ambil indeks bahaya banjir, gempa, tanah longsor, cuaca ekstrem di titik properti; klasifikasikan LOW / MEDIUM / HIGH / UNKNOWN | M | BR-01, BR-03 |
| FR-HAZ-02 | Tampilkan riwayat kejadian bencana hidrometeorologi untuk wilayah administrasi properti (DIBI 2015 s/d 2024) | S | BR-02 |
| FR-HAZ-03 | Ambil prakiraan BMKG 72 jam untuk kelurahan properti sebagai sinyal operasional (jam hujan, suhu maksimum). Tidak dipakai sebagai prediktor permintaan | M | BR-01 |

### 2.6 Market (MKT)

| ID | Requirement | Prioritas | BR |
|----|-------------|-----------|----|
| FR-MKT-01 | Tampilkan indikator BPS kab/kota: jumlah penduduk, kepadatan, PDRB per kapita, pengeluaran per kapita, TPT. Setiap nilai menampilkan periode dan label "konteks wilayah", bukan "data radius" | M | BR-02, BR-03 |

### 2.7 Regulatory (REG)

| ID | Requirement | Prioritas | BR |
|----|-------------|-----------|----|
| FR-REG-01 | Tampilkan checklist per kategori usaha: KBLI yang perlu diverifikasi, langkah cek RDTR/KKPR di OSS, dokumen dasar | M | BR-10 |
| FR-REG-02 | Pengguna mencatat hasil verifikasi manual per item: sesuai / tidak sesuai / belum dicek | M | BR-03 |
| FR-REG-03 | Status regulatori per analisis: `NOT_VERIFIED`, `USER_VERIFIED`, `CONFLICT`. Tidak ada skor numerik | M | BR-03, BR-10 |

### 2.8 Financial (FIN)

| ID | Requirement | Prioritas | BR |
|----|-------------|-----------|----|
| FR-FIN-01 | Hitung kebutuhan kas pra-buka dan capital gap (modal + pembiayaan pasti dikurangi kebutuhan kas) | M | BR-04 |
| FR-FIN-02 | Hitung omzet break-even bulanan, transaksi break-even per hari, margin of safety | M | BR-04 |
| FR-FIN-03 | Hitung rent-to-revenue (sewa tahunan / omzet tahunan target) | M | BR-04 |
| FR-FIN-04 | Hitung payback capex (renovasi + peralatan + lain-lain) dan bandingkan dengan masa sewa | M | BR-04 |
| FR-FIN-05 | Hitung runway: berapa bulan sisa kas bertahan bila omzet 30% di bawah target | S | BR-04 |
| FR-FIN-06 | Sensitivitas: omzet -10/-20/-30%, sewa +10/+20%, gross margin -5 poin | M | BR-04 |
| FR-FIN-07 | Preview finansial real-time saat pengguna mengisi form (tanpa menyimpan) | M | BR-04 |

### 2.9 Decision (DEC)

| ID | Requirement | Prioritas | BR |
|----|-------------|-----------|----|
| FR-DEC-01 | Keputusan dihitung dengan urutan: knockout rules, lalu cap karena data UNKNOWN, lalu weighted score | M | BR-01, BR-03, BR-04 |
| FR-DEC-02 | Skor 0 s/d 100 per dimensi Financial, Market, Risk, Operational. Dimensi dengan coverage di bawah ambang bernilai `null`, bukan 0 | M | BR-03 |
| FR-DEC-03 | Confidence HIGH / MEDIUM / LOW dari coverage faktor dan kesegaran data | M | BR-02, BR-03 |
| FR-DEC-04 | Daftar alasan terurut: knockout dan red flag dulu, lalu hal yang perlu verifikasi, lalu faktor positif. Maksimal 7 di ringkasan | M | BR-02 |
| FR-DEC-05 | Versi rule set disimpan per analisis agar hasil bisa direproduksi | M | BR-02 |

### 2.10 Evidence (EVD)

| ID | Requirement | Prioritas | BR |
|----|-------------|-----------|----|
| FR-EVD-01 | Setiap faktor dapat dibuka: nilai, satuan, sumber, waktu diambil, periode data, metode hitung, status | M | BR-02 |
| FR-EVD-02 | Respons mentah sumber disimpan sebagai snapshot (hash, waktu) dan direferensikan oleh faktor | M | BR-02 |

### 2.11 Compare (CMP)

| ID | Requirement | Prioritas | BR |
|----|-------------|-----------|----|
| FR-CMP-01 | Bandingkan 2 s/d 3 analisis selesai dengan kategori usaha yang sama | M | BR-05 |
| FR-CMP-02 | Urutan: GO, REVIEW, NO-GO; dalam status sama urut skor tertimbang. Tampilkan perbedaan terbesar per dimensi | M | BR-05 |

### 2.12 Report (RPT)

| ID | Requirement | Prioritas | BR |
|----|-------------|-----------|----|
| FR-RPT-01 | Generate laporan HTML print-friendly dan PDF: ringkasan, profil lokasi, pasar, kompetisi, hazard, checklist regulasi, model finansial, red flags, asumsi, rekomendasi, sumber data | M | BR-06 |
| FR-RPT-02 | Laporan memuat disclaimer, versi rule set, tanggal data, dan blok atribusi | M | BR-08, BR-10 |
| FR-RPT-03 | Share link read-only dengan token dan masa berlaku | S | BR-06 |

### 2.13 Akun, analytics, monetisasi (ACC, ANA, PAY)

| ID | Requirement | Prioritas | BR |
|----|-------------|-----------|----|
| FR-ACC-01 | Registrasi dan login email. Analisis tersimpan per akun | M | BR-05 |
| FR-ACC-02 | Analisis hanya bisa diakses pemiliknya, kecuali lewat share link | M | BR-06 |
| FR-ACC-03 | Pengguna dapat menghapus analisis dan akunnya beserta data finansial | M | NFR-06 |
| FR-ANA-01 | Event analytics sesuai PRD §11 | M | BR-07 |
| FR-PAY-01 | Tombol "Beli laporan lengkap" mencatat intent beli dan menampilkan pesan jujur bahwa pembayaran belum tersedia (fake door) | M | BR-07 |

## 3. Non-functional requirements

| ID | Requirement | Target |
|----|-------------|--------|
| NFR-01 | Latensi API sinkron | p95 < 500 ms; finance preview p95 < 300 ms |
| NFR-02 | Waktu analisis end-to-end | p95 < 60 s dengan cache dingin, < 10 s dengan cache hangat |
| NFR-03 | Kepatuhan rate limit sumber | BMKG <= 60 req/menit/IP secara global (bukan per user). Tidak ada panggilan ke Overpass/Nominatim publik |
| NFR-04 | Reproducibility | Hasil analisis dapat dirender ulang dari snapshot tanpa memanggil sumber eksternal |
| NFR-05 | Keamanan | Baseline OWASP ASVS L1. Otorisasi per resource. Rate limit per user. Tidak ada secret di frontend |
| NFR-06 | Privasi | Kepatuhan UU 27/2022 (PDP): tujuan pemrosesan jelas, persetujuan untuk pemakaian data agregat, hak hapus |
| NFR-07 | Aksesibilitas | WCAG 2.1 AA |
| NFR-08 | Mobile | Wizard dan hasil bisa dipakai penuh di ponsel (pengguna sering mengisi saat survei di lokasi) |
| NFR-09 | Lokalisasi | UI Bahasa Indonesia, format angka dan mata uang `id-ID` |
| NFR-10 | Observability | Per sumber: success rate, latensi, cache hit ratio, umur data |
| NFR-11 | Atribusi | Blok atribusi tampil di peta, halaman hasil, laporan |
| NFR-12 | Auditability | Rule set versioned, setiap keputusan menyimpan versi rule dan snapshot ID |

## 4. User stories

Format: Sebagai [peran], saya ingin [aksi], agar [hasil]. Acceptance criteria lengkap ada di PRD §12.

| ID | Story | FR |
|----|-------|----|
| US-01 | Sebagai pemilik usaha, saya ingin memilih kategori usaha dan mendapat asumsi awal, agar tidak mulai dari form kosong | FR-PRF-01, FR-PRF-04 |
| US-02 | Sebagai pemilik usaha, saya ingin mengisi angka bisnis saya sendiri, agar hasil sesuai kondisi saya | FR-PRF-02, FR-PRF-03 |
| US-03 | Sebagai pemilik usaha yang sedang berdiri di depan ruko, saya ingin menaruh pin di peta dari ponsel, agar tidak perlu mengetik alamat | FR-PRP-01, NFR-08 |
| US-04 | Sebagai pemilik usaha, saya ingin mengisi biaya sewa dan biaya pra-buka, agar tahu total uang yang harus keluar | FR-PRP-03, FR-FIN-01 |
| US-05 | Sebagai pemilik usaha, saya ingin melihat angka break-even berubah saat saya mengetik, agar langsung tahu apakah sewa ini berat | FR-FIN-07, FR-FIN-02 |
| US-06 | Sebagai pemilik usaha, saya ingin melihat progres analisis per sumber, agar tahu sistem sedang bekerja dan apa yang gagal | FR-ANL-02, FR-ANL-03 |
| US-07 | Sebagai pemilik usaha, saya ingin keputusan GO/REVIEW/NO-GO dengan alasan, agar tahu langkah berikutnya | FR-DEC-01, FR-DEC-04 |
| US-08 | Sebagai pemilik usaha, saya ingin tahu jika modal saya tidak cukup sebelum outlet buka, agar tidak menandatangani sewa yang tidak bisa saya selesaikan | FR-FIN-01, FR-DEC-01 |
| US-09 | Sebagai pemilik usaha, saya ingin melihat berapa transaksi per hari yang dibutuhkan untuk impas, agar bisa membandingkan dengan pengalaman outlet pertama saya | FR-FIN-02 |
| US-10 | Sebagai pemilik usaha, saya ingin melihat apa yang terjadi jika omzet lebih rendah atau sewa naik, agar tahu seberapa tahan rencana ini | FR-FIN-06, FR-FIN-05 |
| US-11 | Sebagai pemilik usaha, saya ingin melihat risiko banjir dan bencana lain di titik ini dengan sumbernya, agar bisa bertanya ke pemilik ruko dengan data | FR-HAZ-01, FR-HAZ-02, FR-EVD-01 |
| US-12 | Sebagai pemilik usaha, saya ingin tahu jika data risiko tidak tersedia, agar tidak mengira lokasi aman | FR-ANL-03, FR-DEC-02 |
| US-13 | Sebagai pemilik usaha, saya ingin melihat kompetitor dan fasilitas sekitar di peta, agar paham karakter area | FR-LOC-01, FR-LOC-02, FR-LOC-03 |
| US-14 | Sebagai pemilik usaha, saya ingin daftar hal perizinan yang harus saya cek dan cara mengeceknya di OSS, agar tidak menyewa tempat yang zonasinya tidak cocok | FR-REG-01, FR-REG-02 |
| US-15 | Sebagai pemilik usaha, saya ingin membuka sumber setiap angka, agar bisa percaya dan menjelaskan ke partner | FR-EVD-01, FR-EVD-02 |
| US-16 | Sebagai pemilik usaha, saya ingin membandingkan 3 kandidat, agar memilih yang paling masuk akal | FR-CMP-01, FR-CMP-02 |
| US-17 | Sebagai pemilik usaha, saya ingin laporan PDF, agar bisa dikirim ke partner atau franchisor | FR-RPT-01, FR-RPT-02 |
| US-18 | Sebagai partner/investor penerima, saya ingin membuka laporan lewat link tanpa membuat akun | FR-RPT-03 |
| US-19 | Sebagai pengguna, saya ingin menghapus analisis dan data finansial saya | FR-ACC-03 |
| US-20 | Sebagai product owner, saya ingin tahu berapa pengguna yang mencoba membeli laporan, agar bisa menilai kesediaan bayar | FR-PAY-01, FR-ANA-01 |
| US-21 | Sebagai operator, saya ingin melihat kesehatan setiap sumber data, agar tahu kapan hasil berisiko salah | NFR-10, FR-EVD-01 |
