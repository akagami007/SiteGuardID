export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 w-full flex-grow">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Tentang Kami</h1>
      
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Misi Kami</h2>
          <p className="text-slate-600 leading-relaxed">
            SiteGuard ID lahir dari sebuah permasalahan nyata di lapangan: ribuan pelaku UMKM kehilangan modal awal 
            mereka (*sunk cost*) hanya karena salah memilih lokasi ruko. Tergiur harga sewa yang terlihat murah tanpa 
            memperhitungkan risiko banjir (InaRISK), kepadatan kompetitor yang sudah jenuh, maupun simulasi 
            *Margin of Safety* yang rasional. 
          </p>
          <p className="text-slate-600 leading-relaxed mt-4">
            Misi kami adalah **mendemokratisasi data intelijen lokasi** yang selama ini hanya bisa diakses 
            oleh perusahaan *retail* raksasa. Kami ingin setiap pengusaha F&B, *laundry*, dan ritel menengah-bawah 
            memiliki alat (*due diligence*) yang kuat sebelum mereka mentransfer uang deposit sewa.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Bagaimana Kami Bekerja?</h2>
          <p className="text-slate-600 leading-relaxed">
            Sistem kami menggabungkan data pemetaan spasial dari OpenStreetMap (dianalisis dengan PostGIS), 
            peringatan risiko bencana dari InaRISK BNPB, dan metrik finansial untuk menghasilkan satu kesimpulan 
            yang berani: <strong>GO, REVIEW, atau NO-GO.</strong>
          </p>
          <p className="text-slate-600 leading-relaxed mt-4">
            Kami percaya bahwa data yang rumit harus disajikan dengan sangat sederhana. Anda tidak perlu mengerti 
            kode, *query database*, atau membaca laporan geologi. Cukup titik lokasi di peta, dan mesin kami 
            melakukan sisanya.
          </p>
        </section>

        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mt-8">
          <h3 className="font-bold text-indigo-900 mb-2">Jangan Bayar Deposit Sebelum Anda Yakin 100%</h3>
          <p className="text-indigo-800 text-sm">
            SiteGuard ID memberikan tuas negosiasi (leverage) kepada penyewa. Gunakan laporan kami untuk 
            menawar harga sewa yang lebih rasional kepada pemilik properti.
          </p>
        </div>
      </div>
    </main>
  );
}
