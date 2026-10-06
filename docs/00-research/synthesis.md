# Synthesis Laporan Discovery v0.1 (Simulated)

Berdasarkan hasil simulasi wawancara dengan 5 pemilik UMKM representatif, berikut adalah rangkuman pola, uji asumsi, dan keputusan akhir.

## 1. Profil Responden (Mock)
- **R01 (Budi - F&B Cafe)**: Punya 2 cabang. Pernah rugi Rp 150 juta karena lokasi cabang ke-3 ternyata sepi dan terhalang galian kabel berbulan-bulan.
- **R02 (Siti - Kemitraan Laundry)**: Punya 4 cabang. Sangat teliti, tapi kesulitan mencari data cuaca/banjir historis. Pernah cabangnya kebanjiran parah di tahun pertama.
- **R03 (Andi - Kedai Kopi)**: Mengandalkan insting dan "keramaian lalu lalang". Malas mencatat keuangan operasional secara detail.
- **R04 (Dina - Minimarket Mandiri)**: Pemain ritel yang *data-driven*. Mencari ekspansi dengan sangat hati-hati. Menghitung ROI dengan ketat.
- **R05 (Reza - F&B Resto Kecil)**: Ambisius. Sedang mencari ruko murah. Cenderung bias dan menolak saran jika sudah "suka" dengan bangunannya.

## 2. Pola Penemuan Masalah (Masa Lalu)
1. **Rasa Sakit yang Nyata**: 3 dari 5 responden (R01, R02, R04) sepakat bahwa salah pilih lokasi adalah "kiamat kecil" bagi UMKM karena uang sewa dan renovasi hangus (rata-rata kerugian > Rp 100 juta).
2. **Cara Cek Lokasi Saat Ini Sangat Primitif**: Mereka hanya menggunakan Google Maps, nongkrong di seberang ruko sambil menghitung motor lewat, atau sekadar tanya tetangga sekitar. Tidak ada data risiko banjir yang akurat.
3. **Kebutuhan Senjata Negosiasi**: R01 dan R04 menyebutkan, jika ada dokumen yang menunjukkan "skor kompetitor terlalu padat" atau "risiko banjir", dokumen itu bisa mereka pakai untuk *menawar harga sewa ruko* ke pemilik (landlord).

## 3. Uji Gesekan (Input Finansial)
- **Hambatan (Friction)**: R03 (Andi) dan R05 (Reza) kebingungan dengan istilah "Margin Kotor" dan "Biaya Tetap". Mereka hanya tahu "Omzet Kotor".
- **Insight**: Kita harus memberikan opsi kalkulator sederhana atau nilai *default/benchmark* berdasarkan industri (misal: "Gunakan rata-rata F&B: Margin 40%"). Jika dipaksa isi sendiri tanpa bantuan, 40% pengguna akan *drop-off*.

## 4. Uji Reaksi (The Pill Test / AHA Moment)
Responden disimulasikan melihat laporan **NO-GO** untuk ruko incaran mereka.
- **R02 & R04**: Merasa sangat bersyukur. *"Gila, saya hampir bayar deposit. Laporan ini menyelamatkan saya."*
- **R05 (Reza)**: Mengalami *Denial* (penyangkalan). *"Ah, masa sih banjir? Ruko ini tinggi kok. Margin safety 5% gak apa-apa, saya yakin produk saya viral."*
- **Insight**: Sistem tidak bisa "memaksa" pengguna. Untuk tipe seperti Reza, laporan ini diabaikan. Namun bagi 60% pengguna rasional, laporan NO-GO sangat dihormati karena mereka menghargai pelestarian modal mereka.

## 5. Uji Komitmen (Willingness to Pay)
Saat ditawari harga **Rp 99.000** per laporan lokasi:
- **R01, R02, R04 (Lulus)**: Langsung setuju tanpa ragu. *"Rp 99 ribu itu receh dibanding saya rugi renovasi 100 juta."*
- **R03**: Menolak, merasa bisa menilai sendiri secara gratis.
- **R05**: Ragu-ragu, tapi bersedia bayar Rp 50.000.

## 6. Validasi Asumsi Inti (H-1 s/d H-5)
| Asumsi | Status | Keterangan |
|--------|--------|------------|
| **A-U01** (Pemilik UMKM rugi salah lokasi) | **VALIDATED** | Sangat menyakitkan (High Pain Point). |
| **A-U02** (Pengguna mau mengisi 10+ angka finansial) | **INVALIDATED (Diubah)** | Sebagian besar kesulitan. Harus ada *slider* pintar atau tombol *auto-fill* rata-rata industri. |
| **A-U04** (NO-GO jujur dihargai) | **VALIDATED** | Dihargai oleh pengusaha rasional yang sudah pernah rugi (experienced owners). |
| **A-B01** (Kesediaan bayar per laporan) | **VALIDATED** | Rp 99.000 adalah harga psikologis yang sangat masuk akal untuk B2C UMKM. |
| **A-B02** (Laporan dipakai untuk negosiasi) | **NEW DISCOVERY** | Laporan pdf SiteGuard sangat bernilai untuk *leverage* menawar harga sewa ruko. |

---

## 7. KEPUTUSAN FINAL: GO! 🚀
Berdasarkan sintesis di atas, masalah ini **nyata**, **memiliki nilai ekonomi tinggi**, dan **pengguna bersedia membayar** untuk solusinya.

### Syarat GO (Perubahan Produk):
1. **Fitur "Auto-Fill Industry Benchmark"**: Pada langkah input finansial, pengguna bisa klik "Gunakan standar industri" agar tidak bingung soal margin.
2. **Fitur "PDF Report for Negotiation"**: Tambahkan fitur cetak laporan PDF dengan cap "SITEGUARD ID INDEPENDENT REPORT", karena ini menjadi nilai jual (USP) bagi penyewa untuk menawar harga ruko.

*Kita siap melangkah ke fase Pengembangan (Build).*
