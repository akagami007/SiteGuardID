# Product Requirements Document (PRD) v0.1

| Item | Nilai |
|------|-------|
| Produk | SiteGuard ID |
| Versi | 0.1 draft |
| Tanggal | 2026-10-06 |
| Dokumen terkait | [BRD](../02-business/brd.md), [Requirements](../01-requirements/requirements.md), [FSD](../04-system/fsd.md) |

## 01. Product Vision

Sebelum membayar deposit atau menandatangani sewa tempat usaha, pemilik usaha cukup memasukkan lokasi, biaya, dan rencana bisnisnya untuk mendapat keputusan GO / REVIEW / NO-GO yang bisa ia jelaskan ke orang lain, lengkap dengan sumber setiap angka.

Prinsip produk:

1. **Keputusan, bukan skor.** Skor dimensi adalah penjelasan, bukan hasil akhir.
2. **Uang dulu.** Jika modal tidak cukup atau margin terlalu tipis, lokasi sebagus apa pun tetap NO-GO.
3. **Tidak tahu itu jawaban yang sah.** Data yang tidak ada ditampilkan sebagai UNKNOWN, tidak pernah sebagai aman.
4. **Setiap angka bisa dibuka.** Nilai, sumber, waktu, metode.
5. **Bukan nasihat hukum atau investasi.** Regulasi berupa panduan cek, bukan opini kepatuhan.

## 02. Personas (proto-persona, belum divalidasi)

| ID | Persona | Situasi | Kebutuhan | Kekhawatiran |
|----|---------|---------|-----------|--------------|
| P1 | Pemilik laundry kiloan, 1 outlet di Tangerang Selatan, berencana cabang ke-2 | Sudah menemukan 2 s/d 3 ruko kandidat, pemilik minta sewa tahunan di muka | Tahu apakah modal cukup dan kandidat mana paling aman | Uang outlet pertama terkuras, salah pilih kedua kalinya |
| P2 | Calon mitra franchise kafe kecil | Franchisor memberi daftar syarat lokasi, ia harus mengajukan kandidat | Dokumen yang menjelaskan kenapa kandidat ini layak | Ditolak franchisor atau rugi setelah buka |
| P3 | Penerima laporan (pasangan, partner, investor kecil) | Diminta ikut menyetujui | Ringkasan cepat dan bukti | Tidak paham detail teknis |

Akan diganti persona tervalidasi setelah discovery.

## 03. User Journey (P1)

| Tahap | Aktivitas | Pikiran / emosi | Peluang produk |
|-------|-----------|-----------------|----------------|
| Menemukan | Lihat spanduk "disewakan" atau listing online | "Lokasinya ramai, tapi harganya?" | Pin lokasi langsung dari ponsel di depan ruko |
| Menghitung | Tanya harga, deposit, masa sewa, kondisi bangunan | "Cukup tidak ya uangnya?" | Kalkulator kas pra-buka dan break-even real-time |
| Memeriksa | Keliling area, tanya warga, cek kompetitor | "Banjir tidak di sini?" | Hazard dari InaRISK, kompetitor dari OSM, checklist pertanyaan ke pemilik |
| Membandingkan | Membandingkan 2 s/d 3 kandidat di kepala atau catatan | "Yang mana?" | Perbandingan berdampingan |
| Mendiskusikan | Bicara dengan pasangan/partner | "Bagaimana menjelaskannya?" | Laporan PDF / share link |
| Memutuskan | Negosiasi atau tanda tangan | "Semoga tidak salah" | Keputusan dengan alasan, daftar yang harus diverifikasi |

## 04. Jobs To Be Done

- Saat saya menemukan tempat yang terlihat cocok, saya ingin tahu cepat apakah uang saya cukup dan berapa target harian yang harus saya capai, agar saya tidak terikat kontrak yang tidak bisa saya jalankan.
- Saat pemilik ruko mendesak saya segera membayar, saya ingin daftar risiko dan hal yang harus dicek, agar saya bisa menunda atau menegosiasi dengan alasan yang jelas.
- Saat saya harus meyakinkan orang lain, saya ingin dokumen ringkas dengan sumber resmi, agar diskusi tidak berdasarkan perasaan.

## 05. Feature Map

```
SiteGuard MVP
├── Wizard
│   ├── Profil usaha (kategori, angka bisnis)          FR-PRF-*
│   ├── Properti (pin peta, biaya, masa sewa)          FR-PRP-*
│   │   └── Finance preview real-time                  FR-FIN-07
│   └── Konfigurasi (radius)                           FR-ANL-01
├── Analysis run (async, progres per sumber)           FR-ANL-02..04
├── Engines
│   ├── Location (POI, kompetitor, jalan, populasi)    FR-LOC-*
│   ├── Hazard (InaRISK, DIBI, BMKG)                   FR-HAZ-*
│   ├── Market (BPS kab/kota)                          FR-MKT-01
│   ├── Regulatory (checklist, verifikasi manual)      FR-REG-*
│   ├── Financial (gap, BEP, payback, sensitivitas)    FR-FIN-01..06
│   └── Decision (knockout, cap, weighted)             FR-DEC-*
├── Hasil
│   ├── Decision dashboard                             FR-DEC-*
│   ├── Evidence drawer                                FR-EVD-*
│   ├── Compare                                        FR-CMP-*
│   └── Report + share                                 FR-RPT-*
└── Platform
    ├── Akun, hapus data                               FR-ACC-*
    ├── Analytics                                      FR-ANA-01
    └── Fake door pembelian                            FR-PAY-01
```

## 06. Screens (8)

Evidence dibuat sebagai drawer di dashboard, bukan layar terpisah, agar pengguna tidak kehilangan konteks keputusan saat memeriksa bukti. Ini membuat Compare muat dalam batas 8 layar.

| # | Layar | Isi utama | FR |
|---|-------|-----------|----|
| 01 | Landing | Proposisi nilai, contoh laporan nyata (dari worked example §9), CTA "Periksa satu lokasi" | - |
| 02 | Profil usaha | Kategori, modal tersedia, pembiayaan pasti, target omzet, gross margin, biaya tetap non-sewa, rata-rata transaksi, hari operasional | FR-PRF-01..04 |
| 03 | Properti | Peta + pin, label, sewa/tahun, skema bayar, masa sewa, deposit, luas, renovasi, peralatan, biaya lain. Panel finance preview menempel di samping (desktop) atau bawah (mobile) | FR-PRP-01..04, FR-FIN-07 |
| 04 | Konfigurasi | Radius 500 m / 1 km / 2 km, ringkasan input, tombol jalankan | FR-ANL-01 |
| 05 | Proses | Daftar sumber dengan status (antre, berjalan, selesai, dari cache, gagal) dan waktu | FR-ANL-02, FR-ANL-03 |
| 06 | Decision dashboard | Keputusan + confidence, alasan terurut, skor dimensi, status regulatori, peta (radius, POI, kompetitor), tabel finansial + sensitivitas, checklist regulasi interaktif. Setiap angka membuka Evidence drawer | FR-DEC-*, FR-EVD-*, FR-REG-02 |
| 07 | Compare | 2 s/d 3 analisis berdampingan, urutan sesuai FR-CMP-02, highlight perbedaan terbesar | FR-CMP-* |
| 08 | Report | Pratinjau laporan, unduh PDF, buat share link, tombol fake door "Beli laporan lengkap" | FR-RPT-*, FR-PAY-01 |

Catatan: konsep awal punya toggle faktor (Market, Risk, Regulation, Financial, Operation) di layar konfigurasi. Toggle ini **dihapus**. Mematikan Risk atau Financial membuat keputusan GO tidak bermakna. Semua engine selalu berjalan.

Radius 5 km juga dihapus dari MVP: untuk usaha walk-in perkotaan radius ini tidak informatif dan memperbesar biaya query.

## 07. Functional Requirements

Daftar lengkap dengan ID ada di [requirements.md](../01-requirements/requirements.md). Bagian ini menjelaskan logika yang tidak muat di tabel.

### 7.1 Financial engine

Input (semua dalam Rupiah kecuali disebut):

| Simbol | Input |
|--------|-------|
| `R_y` | Sewa per tahun |
| `pay` | Skema bayar: `ANNUAL_UPFRONT` atau `MONTHLY` |
| `L` | Masa sewa (bulan) |
| `D` | Deposit |
| `Ren`, `Eq`, `Oth` | Renovasi, peralatan, biaya lain pra-buka |
| `C` | Modal tersedia |
| `F` | Pembiayaan pasti (default 0) |
| `Rev` | Target omzet per bulan |
| `GM` | Gross margin (0 s/d 1) |
| `FC_nr` | Biaya tetap bulanan di luar sewa |
| `T` | Rata-rata nilai transaksi |
| `Days` | Hari operasional per bulan |

Turunan:

```
R_m          = R_y / 12
FC           = FC_nr + R_m
RentUpfront  = R_y if pay = ANNUAL_UPFRONT else R_m
PreOpenCash  = RentUpfront + D + Ren + Eq + Oth
CapitalGap   = (C + F) - PreOpenCash                  # negatif = kurang
ReserveMonths= max(CapitalGap, 0) / FC
BEP_Rev      = FC / GM
BEP_TxDay    = ceil(BEP_Rev / Days / T)
Target_TxDay = ceil(Rev / Days / T)
MoS          = (Rev - BEP_Rev) / Rev
RentToRev    = R_y / (Rev * 12)
OpProfit     = Rev * GM - FC
Payback      = (Ren + Eq + Oth) / OpProfit   if OpProfit > 0 else null (tidak kembali)
Runway70     = ReserveMonths-equivalent saat omzet 70% target:
               burn = FC - 0.7 * Rev * GM ; if burn <= 0 then "tidak defisit" else max(CapitalGap,0) / burn
```

Sensitivitas (FR-FIN-06): hitung ulang `OpProfit`, `BEP_Rev`, `MoS` untuk omzet -10/-20/-30%, sewa +10/+20%, GM -5 poin.

Catatan: deposit tidak dihitung dalam payback karena umumnya dikembalikan di akhir sewa, tetapi tetap dihitung dalam kebutuhan kas pra-buka.

### 7.2 Decision engine (rule set `v0.1`)

Urutan evaluasi:

**Langkah 1, knockout (hasil NO-GO):**

| Kode | Kondisi | Pesan ringkas |
|------|---------|---------------|
| K1 | `CapitalGap < 0` | Modal kurang Rp X untuk sampai outlet buka |
| K2 | `MoS < 0` | Target omzet di bawah titik impas |
| K3 | `0 <= MoS < 10%` | Margin terlalu tipis: turun omzet sedikit sudah rugi |
| K4 | Pengguna mencatat zonasi/KKPR **tidak sesuai** | Lokasi tidak sesuai tata ruang menurut hasil cek OSS |

**Langkah 2, pemicu REVIEW (jika tidak ada knockout):**

| Kode | Kondisi |
|------|---------|
| V1 | `ReserveMonths < 3` (cadangan kas setelah pra-buka kurang dari 3 bulan biaya tetap) |
| V2 | `10% <= MoS < 25%` |
| V3 | `Payback > L` atau `Payback = null` |
| V4 | `RentToRev > 25%` |
| V5 | Indeks bahaya banjir, longsor, atau likuefaksi = HIGH |
| V6 | Status regulatori `NOT_VERIFIED` |
| V7 | Faktor kritis UNKNOWN (indeks banjir, input finansial wajib) atau confidence LOW |

**Langkah 3, skor:** jika tidak ada knockout dan tidak ada pemicu REVIEW, GO bila skor tertimbang >= 65, selain itu REVIEW dengan alasan "karakter lokasi lemah".

Bobot default (A-F07): Financial 35, Market 30, Risk 20, Operational 15. Regulatory tidak masuk skor (ADR-005). Jika dimensi bernilai `null` (UNKNOWN), bobotnya tidak didistribusikan ulang diam-diam; keputusan otomatis terkena V7.

Konsekuensi yang disengaja: **GO hanya mungkin setelah pengguna mencatat hasil cek zonasi di OSS (V6).** Produk mendorong verifikasi, bukan menggantikannya.

### 7.3 Faktor per dimensi

| Dimensi | Faktor | Sumber | Status jika gagal |
|---------|--------|--------|-------------------|
| Financial | Capital gap, reserve months, MoS, rent-to-revenue, payback vs masa sewa | Input | Wajib ada (validasi form) |
| Market | Populasi radius (jika lolos spike), kepadatan POI permukiman/pendidikan/kantor, indikator BPS kab/kota | INARISKPOP, OSM, BPS | UNKNOWN per faktor |
| Market | Kompetitor dalam radius, jarak kompetitor terdekat | OSM | UNKNOWN; jika ada, diberi label batas bawah |
| Risk | Indeks banjir, banjir bandang, gempa, longsor, cuaca ekstrem, likuefaksi | InaRISK | UNKNOWN |
| Risk | Riwayat kejadian hidrometeorologi wilayah | DIBI | UNKNOWN |
| Operational | Jarak ke jalan primary/secondary/tertiary, POI transit, jam hujan 72 jam ke depan | OSM, BMKG | UNKNOWN |
| Regulatory | Checklist + hasil verifikasi manual | Template + input | `NOT_VERIFIED` |

Fungsi skor per faktor didefinisikan di FSD §4.3 dan diversikan bersama rule set.

## 08. Non Functional Requirements

Lihat NFR-01 s/d NFR-12 di requirements.md. Yang paling memengaruhi UX: NFR-02 (analisis < 60 s), NFR-08 (penuh di ponsel), NFR-07 (WCAG AA).

## 09. Worked example: laundry di Ciputat

Contoh dari konsep awal, dihitung dengan rule set v0.1. Angka bertanda `[contoh]` tidak ada di konsep awal dan ditambahkan agar perhitungan lengkap.

Input: sewa Rp85 jt/tahun dibayar tahunan di muka, masa sewa 24 bulan `[contoh]`, deposit Rp10 jt, renovasi Rp60 jt, peralatan Rp80 jt, modal Rp180 jt, target omzet Rp45 jt/bulan, gross margin 45%, biaya tetap total Rp16 jt/bulan termasuk sewa `[contoh: konsep awal tidak jelas apakah termasuk sewa]`, rata-rata transaksi Rp30.000 `[contoh]`, 30 hari operasional.

| Metrik | Hasil |
|--------|-------|
| Kebutuhan kas pra-buka | 85 + 10 + 60 + 80 = **Rp235 jt** |
| Capital gap | 180 - 235 = **-Rp55 jt** → K1 |
| Omzet impas | 16 / 0,45 = **Rp35,6 jt/bulan** |
| Transaksi impas per hari | 35,6 jt / 30 / 30.000 = **40 transaksi** (target 50) |
| Margin of safety | (45 - 35,6) / 45 = **21%** → V2 |
| Rent-to-revenue | 85 / 540 = **15,7%** (perhatian, belum red flag) |
| Laba operasional pada target | 20,25 - 16 = **Rp4,25 jt/bulan** |
| Payback capex | 140 / 4,25 = **33 bulan** > masa sewa 24 bulan → V3 |
| Omzet -20% | Laba Rp0,2 jt/bulan (praktis impas) |
| Omzet -30% | Rugi Rp1,8 jt/bulan |
| Sewa +10% | Omzet impas naik ke Rp37,1 jt |

**Keputusan: NO-GO.**

Alasan (urutan tampil):

1. Modal kurang Rp55 jt untuk sampai outlet buka (sewa tahunan di muka + deposit + renovasi + peralatan).
2. Margin of safety 21%: omzet turun 20% sudah menghapus laba.
3. Investasi renovasi dan peralatan baru kembali di bulan ke-33, setelah masa sewa 24 bulan berakhir.
4. Zonasi belum diverifikasi di OSS.
5. (Faktor hazard dan lokasi ditampilkan setelahnya, tidak mengubah keputusan.)

Bagian "Apa yang harus berubah" (Phase 2, negotiation recommendation) akan menunjukkan misalnya: jika sewa dibayar bulanan, kebutuhan kas pra-buka turun ke Rp157,1 jt dan capital gap menjadi +Rp22,9 jt, tetapi cadangan kas hanya 1,4 bulan biaya tetap, sehingga hasilnya masih REVIEW (V1).

Contoh ini menunjukkan nilai produk: konsep awal menilai lokasi dari skor pasar dan risiko, padahal masalah terbesarnya ada di arus kas.

## 10. Analytics

| Event | Properti | Untuk menjawab |
|-------|----------|----------------|
| `wizard_step_completed` | `step` | Di mana pengguna berhenti |
| `finance_preview_changed` | `capital_gap_sign`, `mos_bucket` | Apakah preview dipakai |
| `analysis_run_requested` | `business_type`, `radius` | Volume |
| `analysis_completed` | `decision`, `confidence`, `duration_ms`, `unknown_count` | Distribusi hasil, kualitas data |
| `provider_failed` | `provider`, `error_class` | Kesehatan sumber |
| `evidence_opened` | `factor_key` | Apakah evidence membangun kepercayaan (H-3) |
| `regulatory_item_updated` | `item_key`, `status` | Apakah pengguna benar-benar cek OSS |
| `decision_feedback` | `changed_plan` (ya/tidak/belum tahu) | KPI utama: perubahan keputusan |
| `comparison_created` | `n` | Pemakaian compare |
| `report_generated`, `report_shared`, `shared_report_viewed` | | H-5 |
| `purchase_intent_clicked` | `price_variant` | Kesediaan bayar (H-4) |

`decision_feedback` muncul sebagai satu pertanyaan di dashboard setelah pengguna menggulir alasan: "Apakah hasil ini mengubah rencana Anda untuk lokasi ini?"

## 11. Error States

| Situasi | Perilaku |
|---------|----------|
| Lokasi di luar Jabodetabek | Tolak di layar 03, jelaskan cakupan MVP |
| Input finansial tidak konsisten (GM > 100%, omzet 0, transaksi 0) | Validasi inline, tidak bisa lanjut |
| Asumsi di luar rentang wajar kategori (jika rentang sudah ada) | Peringatan, boleh lanjut, dicatat di laporan |
| Satu sumber gagal / timeout | Analisis selesai, faktor UNKNOWN dengan alasan, confidence turun, V7 berlaku jika faktor kritis |
| Semua sumber eksternal gagal | Hasil hanya finansial, keputusan maksimal REVIEW, banner jelas |
| Data kedaluwarsa melewati ambang | Label "data lama" dengan tanggal; lewat hard expiry menjadi UNKNOWN |
| Rate limit BMKG tercapai | Job ditunda dan diulang (backoff), tidak gagal langsung |
| Job analisis macet > 120 s | Status `FAILED` dengan opsi jalankan ulang |
| Peta dasar tidak termuat | Analisis tetap bisa dibaca dalam bentuk tabel |
| Share link kedaluwarsa | Halaman jelas, tanpa membocorkan isi |

## 12. Permissions

| Aksi | Tamu | Pengguna terdaftar (pemilik) | Penerima share link |
|------|------|------------------------------|---------------------|
| Lihat landing, contoh laporan | Ya | Ya | Ya |
| Finance preview | Ya | Ya | Tidak |
| Simpan profil, properti, jalankan analisis | Tidak | Ya (kuota harian) | Tidak |
| Lihat dashboard, evidence | Tidak | Milik sendiri | Read-only via token |
| Compare, report, share | Tidak | Milik sendiri | Tidak |
| Hapus data | Tidak | Milik sendiri | Tidak |

Analisis memerlukan akun untuk membatasi beban ke sumber publik (BR-09) dan menyimpan hasil.

## 13. Data Freshness

Ikuti tabel TTL di [data-source-catalog.md §3](../00-research/data-source-catalog.md). Di UI:

- Setiap faktor menampilkan "diambil [tanggal]" dan "periode data [periode]" bila berbeda (mis. BPS 2024, InaRISK versi dataset).
- Hasil analisis membeku pada snapshot saat dijalankan. Menjalankan ulang membuat versi baru.

## 14. Acceptance Criteria (pilihan)

**AC-US08 Modal tidak cukup**
- Given modal Rp180 jt dan kebutuhan kas pra-buka Rp235 jt
- When analisis selesai
- Then keputusan = NO-GO, alasan pertama menyebut kekurangan Rp55 jt, dan skor dimensi lain tetap ditampilkan tapi tidak mengubah keputusan.

**AC-US12 Sumber hazard gagal**
- Given InaRISK mengembalikan error atau timeout
- When analisis selesai
- Then semua faktor hazard berstatus UNKNOWN dengan alasan, skor Risk = null (bukan 0, bukan 100), keputusan tidak mungkin GO, dan dashboard menampilkan "Data risiko bencana tidak tersedia, verifikasi manual diperlukan".

**AC-US05 Preview real-time**
- Given pengguna di layar 03
- When mengubah sewa per tahun
- Then capital gap, omzet impas, dan transaksi impas per hari diperbarui dalam < 300 ms setelah berhenti mengetik (debounce), tanpa menyimpan data.

**AC-US06 Progres**
- Given analisis berjalan
- When satu sumber selesai atau gagal
- Then status sumber itu berubah di layar 05 dalam <= 3 s (polling) tanpa reload.

**AC-US07 Alasan**
- Given analisis selesai
- Then minimal satu alasan ditampilkan untuk setiap keputusan, knockout tampil paling atas, dan setiap alasan menautkan ke faktor di evidence drawer.

**AC-US14 Regulasi**
- Given checklist regulasi tampil
- When pengguna menandai item zonasi "tidak sesuai"
- Then keputusan dihitung ulang menjadi NO-GO (K4) tanpa memanggil sumber eksternal.

**AC-US15 Evidence**
- Given faktor indeks banjir
- When dibuka
- Then tampil nilai mentah, kelas, sumber "BNPB InaRISK", nama layanan, waktu diambil, metode klasifikasi, dan ID snapshot.

**AC-US16 Compare**
- Given 3 analisis kategori sama dengan hasil NO-GO, REVIEW, GO
- When dibandingkan
- Then urutan GO, REVIEW, NO-GO, dan analisis dengan kategori berbeda tidak bisa dipilih.

**AC-US17 Laporan**
- Given analisis selesai
- When laporan dibuat
- Then PDF memuat semua section FR-RPT-01, disclaimer, versi rule set, blok atribusi, dan angka identik dengan dashboard.

**AC-US19 Hapus**
- Given pengguna menghapus analisis
- Then analisis, input finansial, laporan, dan share link terkait tidak bisa diakses lagi; snapshot sumber publik boleh tetap ada karena tidak berisi data pribadi.

## 15. MVP Scope dan urutan rilis

| Slice | Isi | Bisa diuji ke pengguna? |
|-------|-----|-------------------------|
| S0 | Prototype klik (Next.js, data mock dari worked example + 2 lokasi nyata) | Ya, untuk discovery tahap 2 |
| S1 | Wizard + finance engine + finance preview + decision (finansial saja) | Ya |
| S2 | Location engine (OSM import) + peta | Ya |
| S3 | Hazard engine (InaRISK, BMKG) + evidence drawer + UNKNOWN handling | Ya |
| S4 | Market (BPS) + regulatory checklist | Ya |
| S5 | Compare + report PDF + share link + fake door + analytics | Ya |

Setiap slice berdiri sendiri dan menghasilkan sesuatu yang bisa dicoba. S1 sengaja di depan: kalau bagian finansial saja tidak mengubah keputusan pengguna, lapisan data geospasial kemungkinan tidak akan menyelamatkan produk.
