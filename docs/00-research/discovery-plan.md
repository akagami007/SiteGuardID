# Discovery Plan v0.1

Tujuan: menjawab RQ-1 s/d RQ-3 di market-research.md dan menguji H-1 s/d H-5 sebelum membangun backend.

## 1. Rekrutmen

| Kelas | Target jumlah | Kriteria | Saluran |
|-------|---------------|----------|---------|
| B. Pemilik UMKM buka cabang | 3 | Punya >= 1 outlet sewa, berencana atau baru membuka outlet berikutnya dalam 12 bulan | Komunitas usaha lokal, kenalan, grup pemilik laundry/kafe |
| C. Mitra franchise / calon mitra | 2 | Sedang atau pernah memilih lokasi untuk outlet franchise | Pameran waralaba, grup mitra |
| E. Agen / konsultan properti komersial | 1 s/d 2 | Menangani sewa ruko | Kontak agen di listing marketplace |

Total 6 s/d 7 orang. Lima wawancara pertama cukup untuk melihat pola. Jangan rekrut teman yang akan bersikap sopan.

## 2. Wawancara problem (45 menit, sebelum prototype)

Aturan: tanyakan kejadian masa lalu, bukan opini tentang ide. Jangan menunjukkan prototype di sesi ini.

1. Ceritakan terakhir kali Anda menyewa tempat usaha. Mulai dari kapan mulai mencari.
2. Berapa total uang yang keluar sebelum outlet buka? Rinciannya apa saja?
3. Apa saja yang Anda cek sebelum tanda tangan? Bagaimana caranya?
4. Dari mana informasinya? (survei sendiri, agen, pemilik, Google Maps, kenalan)
5. Berapa lama dari menemukan tempat sampai tanda tangan?
6. Siapa lagi yang ikut memutuskan? Apa yang mereka minta lihat?
7. Ada hal yang baru ketahuan setelah menyewa dan Anda menyesal tidak cek sebelumnya? Berapa kira-kira kerugiannya?
8. Pernah hampir menyewa lalu batal? Apa alasannya?
9. Data apa yang paling sulit didapat waktu itu?
10. Kalau ada seseorang yang mengerjakan pengecekan ini untuk Anda, apa yang harus ada di hasilnya agar Anda percaya?
11. Pernah membayar untuk survei/konsultan/alat untuk keputusan lokasi? Berapa?
12. Untuk outlet berikutnya, apa yang akan Anda lakukan berbeda?

Catat per responden: kejadian kerugian (ya/tidak, nominal), langkah pengecekan yang dilakukan, pihak yang terlibat, alat yang pernah dicoba.

## 3. Uji prototype (60 menit, setelah prototype klik)

Desain: 3 lokasi kandidat nyata x 2 jenis usaha (laundry, kafe kecil).

1. Tunjukkan data mentah lokasi (alamat, foto, harga sewa, luas). Minta responden memutuskan: sewa / tidak / perlu cek lagi, dan alasannya. Catat.
2. Responden menjalankan analisis di prototype dengan asumsi bisnisnya sendiri.
3. Minta responden memutuskan lagi. Catat perubahan dan alasan.
4. Minta responden menjelaskan hasil ke "partner" (peneliti berperan sebagai partner). Catat bagian mana yang dia rujuk.
5. Tanyakan: bagian mana yang tidak Anda percaya? Kenapa?
6. Uji harga: tawarkan laporan lengkap untuk lokasi kandidat berikutnya dengan harga tertentu (variasikan antar responden). Catat ya/tidak. Jika memungkinkan, minta komitmen nyata (pre-order, transfer kecil yang bisa dikembalikan).

## 4. Kriteria keberhasilan

| Metrik | Target untuk lanjut build | Mengukur |
|--------|---------------------------|----------|
| Memahami hasil | >= 4/5 bisa menjelaskan kenapa hasilnya GO/REVIEW/NO-GO tanpa bantuan | Comprehension |
| Percaya evidence | >= 3/5 merujuk sumber data saat menjelaskan | Trust |
| Menemukan red flag | >= 4/5 menyebut minimal satu red flag yang benar | Usefulness |
| Membandingkan | >= 4/5 bisa memilih kandidat terbaik dari 3 dan menjelaskan alasannya | Compare flow |
| Mengubah keputusan | >= 2/5 mengubah keputusan awal minimal untuk satu lokasi | Decision impact |
| Kesediaan bayar | >= 2/5 berkomitmen pada laporan berikutnya | Willingness to pay |

Jika "mengubah keputusan" dan "kesediaan bayar" sama-sama gagal, jangan lanjut ke backend. Kembali ke problem.

## 5. Yang tidak ditanyakan

- "Bagaimana menurut Anda idenya?"
- "Apakah Anda akan memakai aplikasi ini?"
- "Suka desainnya?"

Jawaban untuk pertanyaan seperti ini hampir selalu positif dan tidak memprediksi perilaku.

## 6. Output

- `interview-notes/R01.md` ... `R07.md` (satu file per responden, tanpa data pribadi sensitif).
- `synthesis.md`: pola, kutipan, status H-1 s/d H-5.
- Update assumptions.md (status setiap asumsi).
