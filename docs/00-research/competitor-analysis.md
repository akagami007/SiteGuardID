# Competitor Analysis v0.1

Status: desk research. Kolom bertanda `?` belum diuji langsung (perlu akun/demo). Tugas discovery: isi semua `?` dengan mencoba produknya.

## 1. Kategori pesaing

Pesaing SiteGuard bukan hanya aplikasi peta. Pesaing sebenarnya adalah **cara pengguna mengambil keputusan hari ini**.

| Kategori | Contoh | Menjawab pertanyaan |
|----------|--------|---------------------|
| Location intelligence / site selection | MAPID, GeoZMap, DekatLokasi, Ruko Ruko | "Lokasi mana yang potensial?" |
| Konsultan properti | CBRE Indonesia, konsultan lokal | "Lokasi mana yang cocok untuk klien enterprise?" |
| Marketplace properti | Rumah123, 99.co, OLX | "Ruko mana yang tersedia dan berapa harganya?" |
| Alat pemerintah | OSS RDTR Interaktif, InaRISK, GISTARU | "Apa zonasi/risiko di titik ini?" (satu dimensi) |
| DIY | Google Maps, survei lapangan, spreadsheet, tanya kenalan | Semua, tidak terstruktur |

## 2. Competitor matrix

| Dimensi | MAPID | GeoZMap | DekatLokasi | Ruko Ruko | CBRE (konsultan) | OSS RDTR Interaktif | DIY (Maps + Excel) | **SiteGuard (target)** |
|---------|-------|---------|-------------|-----------|------------------|---------------------|--------------------|------------------------|
| Target utama | Enterprise, pemerintah | UMKM s/d tim ekspansi | ? | ? | Enterprise | Pelaku usaha (perizinan) | Semua | UMKM ekspansi, franchisee |
| Unit analisis | Area / portofolio titik | Titik di peta | ? | ? | Proyek | Persil / titik | Bebas | **Satu properti kandidat + rencana bisnis** |
| Mencari lokasi baru | Ya | Ya (rekomendasi area) | ? | ? | Ya | Tidak | Manual | **Tidak (sengaja)** |
| Skor lokasi | Ya (site selection) | Ya | ? | ? | Internal | Tidak | Tidak | Skor per dimensi, bukan skor tunggal |
| Kompetitor sekitar | Ya | Ya | ? | ? | Ya | Tidak | Manual | Ya (OSM, dengan confidence) |
| Model finansial (capital gap, BEP, transaksi/hari) | ? | Tidak terlihat di materi publik | ? | ? | Kemungkinan, per proyek | Tidak | Kalau bisa Excel | **Ya, inti produk** |
| Risiko bencana | ? | Tidak terlihat | ? | ? | ? | Tidak | Manual (InaRISK) | Ya (InaRISK) |
| Regulasi / zonasi | ? | Tidak terlihat | ? | ? | Ya | **Ya, sumber resmi** | Manual | Checklist + arahan verifikasi ke OSS |
| Evidence + sumber per faktor | ? | ? | ? | ? | Laporan konsultan | Ya (resmi) | Tidak | **Ya, wajib per faktor** |
| Status UNKNOWN eksplisit | ? | ? | ? | ? | N/A | N/A | N/A | **Ya** |
| Output | Dashboard, laporan | Skor + peta | ? | ? | Laporan | Informasi zonasi | Catatan pribadi | GO / REVIEW / NO-GO + laporan |
| Harga | Enterprise (kontak sales) | ? | ? | ? | Fee konsultan | Gratis | Gratis (waktu) | Per laporan + B2B |

## 3. Posisi

Peta posisi dua sumbu:

```
                   Fokus finansial & keputusan sewa
                               ^
                               |
            Spreadsheet DIY    |      SiteGuard (target)
                               |
  Satu titik  <----------------+----------------> Banyak titik / area
                               |
            OSS RDTR, InaRISK  |      MAPID, GeoZMap, CBRE
                               |
                   Fokus karakteristik lokasi
```

Kalimat posisi:

> Untuk pemilik usaha yang sudah menemukan tempat dan hampir menyewa, SiteGuard memeriksa apakah tempat itu masuk akal untuk rencana bisnis dan modalnya, dengan bukti dari sumber resmi. Berbeda dengan platform site selection yang membantu mencari lokasi, SiteGuard membantu memutuskan satu lokasi sebelum uang keluar.

## 4. Pembeda yang bisa dipertahankan (dan yang tidak)

| Pembeda | Bisa ditiru cepat? | Catatan |
|---------|-------------------|---------|
| Kalkulator BEP | Ya, mudah | Bukan moat. Jangan jadikan pesan utama |
| Knockout logic (capital gap, margin of safety, payback vs masa sewa) yang menghasilkan NO-GO meski lokasi bagus | Sedang | Butuh keberanian produk untuk bilang "jangan" |
| Evidence trail + snapshot sumber yang reproducible | Sedang | Infrastruktur, bukan UI |
| Template asumsi per kategori usaha yang dikalibrasi dari data pengguna | Sulit, butuh waktu | Moat jangka panjang. Mulai kumpulkan sejak MVP (dengan izin) |
| Outcome data (lokasi yang disewa vs hasil usaha 6 s/d 12 bulan) | Sangat sulit | Phase 3. Ini yang memungkinkan model prediktif |

## 5. Tugas verifikasi kompetitor (discovery)

- [ ] Coba GeoZMap dengan satu titik di Ciputat. Catat input, output, harga.
- [ ] Cari tahu produk DekatLokasi dan Ruko Ruko: target, fitur, harga, apakah aktif.
- [ ] Cek apakah MAPID menyediakan paket untuk UMKM atau hanya enterprise.
- [ ] Tanyakan ke 5 responden discovery: alat apa yang pernah mereka coba.
- [ ] Isi semua sel `?` di matrix.
