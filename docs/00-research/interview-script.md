# Panduan Wawancara (Interview Script) - SiteGuard ID

Dokumen ini adalah skrip wawancara terperinci (*runbook*) yang akan digunakan saat berhadapan langsung dengan target audiens (Pemilik UMKM F&B/Retail/Laundry yang berencana ekspansi).

---

## Sesi 1: Pemanasan & Konteks (5 Menit)
*Tujuan: Membuat responden nyaman dan memahami profil bisnis mereka.*

1. "Halo [Nama], terima kasih atas waktunya. Bisa ceritakan sedikit tentang bisnis [Nama Usaha] Anda saat ini? Sudah berapa lama berjalan dan ada berapa cabang?"
2. "Siapa target pasar utama Anda? (Contoh: Mahasiswa, pekerja kantoran, keluarga?)"
3. "Kapan terakhir kali Anda mencari lokasi baru atau menandatangani kontrak sewa ruko/kios?"

---

## Sesi 2: Menggali Masa Lalu (Problem Discovery) (15 Menit)
*Tujuan: Mencari tahu apakah masalah salah pilih lokasi itu nyata, menyakitkan, dan menguras uang. Jangan bahas aplikasi dulu.*

4. "Bisa ceritakan proses saat Anda memilih lokasi untuk cabang terakhir Anda? Berapa lama prosesnya dari mulai survei sampai bayar deposit?"
5. "Bagaimana cara Anda mengecek kelayakan lokasi tersebut? (Apakah nongkrong di depan ruko, tanya warga, cek Google Maps, insting saja?)"
6. "Berapa total uang (*Capex*) yang Anda keluarkan sebelum hari pertama buka? (Sewa + deposit + renovasi + beli alat)."
7. **[Pertanyaan Emas]** "Pernahkah Anda salah pilih lokasi yang membuat Anda merugi atau terpaksa tutup? Jika ya, apa penyebab utamanya yang baru Anda sadari **setelah** telanjur sewa?"
8. "Seberapa sering Anda berbeda pendapat dengan partner/investor/keluarga soal lokasi? Data apa yang biasanya dipakai untuk berdebat?"

---

## Sesi 3: Uji Gesekan / Friction Test (15 Menit)
*Tujuan: Menunjukkan konsep Wireframe Langkah 1-4 (Input) dan melihat apakah mereka tahu angka-angkanya.*

*(Tunjukkan desain kasar/wireframe Langkah 1 s/d 4. Jelaskan bahwa ini alat bantu analisis).*

9. "Di aplikasi ini, Anda diminta memasukkan data **Target Omzet per Bulan** dan **Margin Kotor**. Sebagai pengusaha, apakah angka ini sudah ada di kepala Anda saat mau buka cabang, atau Anda harus menebak-nebak?"
10. "Ada juga isian **Biaya Tetap per Bulan (Gaji, Listrik, dll)** di luar sewa. Apakah Anda bersedia meluangkan waktu 2-3 menit mengisi form ini demi mendapatkan analisis lokasi yang akurat, atau ini terasa terlalu merepotkan?"
11. "Angka apa di form ini yang menurut Anda paling sulit untuk dijawab secara akurat?"

---

## Sesi 4: Uji Reaksi / The Pill Test (15 Menit)
*Tujuan: Menunjukkan hasil akhir (Report) dan menguji apakah mereka menuruti data atau menolak data (sunk-cost fallacy).*

*(Skenario Roleplay: Minta mereka membayangkan mereka baru saja menemukan ruko idaman. Harganya murah, bentuk bangunannya bagus. Mereka sangat ingin menyewanya minggu ini).*

*(Tunjukkan layar Hasil Evaluasi varian **NO-GO / MERAH**).*

12. "Bayangkan Anda sangat naksir dengan sebuah ruko, lalu sistem kami mengeluarkan hasil **NO-GO (Berbahaya)** ini. Di sini tertulis: *Margin of Safety Anda hanya 5% dan ruko ini berada di area rawan banjir InaRISK*. Apa reaksi pertama Anda?"
13. "Apakah Anda akan batal menyewa, tetap menyewa, atau menggunakan laporan ini untuk negosiasi harga turun?"
14. "Bagian mana dari laporan ini yang **tidak Anda percayai**? (Apakah kompetitornya kurang akurat? Cuacanya? Hitungan keuangannya?)"

---

## Sesi 5: Uji Komitmen / The Ask (10 Menit)
*Tujuan: Menguji kesediaan membayar (Willingness to Pay).*

15. "Aplikasi ini memakan biaya server untuk menarik data dari satelit, BPS, dan regulasi tata ruang. Jika Anda sedang serius mencari 3 lokasi bulan depan, apakah Anda bersedia membayar **Rp 99.000** per satu kali cetak laporan lokasi?"
16. "Jika tidak, mengapa? Dan berapa harga yang masuk akal menurut Anda untuk mencegah kerugian ratusan juta dari salah sewa?"
17. *(Jika mereka sangat antusias)* "Kami sedang membangun versi pertamanya. Apakah Anda mau melakukan *Pre-Order* sebesar Rp 50.000 hari ini untuk mendapatkan 5 kuota laporan saat kami rilis bulan depan?"

---
### Kriteria Gagal / Batal Bikin (No-Go Decision untuk Kita)
Kita **tidak akan menulis satu baris kode frontend pun** jika wawancara menunjukkan:
- Mereka tidak peduli dengan angka margin/operasional (insting murni).
- Mereka tetap menyewa ruko impiannya meski kita sodorkan data NO-GO (emosional > rasional).
- Mereka menolak membayar Rp 99.000 untuk mencegah risiko capex Rp 150.000.000.
