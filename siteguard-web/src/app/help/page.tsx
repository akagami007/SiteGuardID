"use client";

export default function HelpPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 w-full flex-grow">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Pusat Bantuan</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-indigo-600 text-white rounded-2xl p-6 shadow-sm">
          <svg className="w-8 h-8 mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          <h3 className="font-bold text-lg mb-1">Email Kami</h3>
          <p className="text-indigo-100 text-sm">Tim kami merespons dalam 1x24 jam kerja.</p>
          <a href="mailto:support@siteguard.id" className="inline-block mt-4 text-sm font-bold bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition">support@siteguard.id</a>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm md:col-span-2">
          <h3 className="font-bold text-lg mb-4 text-slate-800">Tinggalkan Pesan</h3>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Pesan telah terkirim!'); }}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Nama Lengkap</label>
                <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-indigo-500" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Alamat Email</label>
                <input type="email" className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-indigo-500" required />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Pesan / Kendala</label>
              <textarea rows={4} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-indigo-500 resize-none" required></textarea>
            </div>
            <button type="submit" className="bg-slate-800 text-white text-sm font-bold px-6 py-2 rounded-lg hover:bg-slate-700 transition">Kirim Pesan</button>
          </form>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-800 mb-6">Pertanyaan yang Sering Diajukan (FAQ)</h2>
      <div className="space-y-4">
        {[
          {
            q: "Apakah data kompetitor yang ditampilkan akurat?",
            a: "Kami menggunakan database OpenStreetMap yang dimuat secara luring ke dalam PostGIS. Angka yang muncul adalah jumlah akurat titik-titik (POI) bisnis yang terdaftar di OSM dalam radius 500 meter dan 2 kilometer dari lokasi yang Anda tunjuk."
          },
          {
            q: "Bagaimana cara membaca Margin of Safety?",
            a: "Margin of Safety menunjukkan seberapa aman bisnis Anda dari kerugian (Break Even Point). Jika margin Anda di bawah 10-15%, sedikit saja penurunan penjualan akan membuat Anda rugi. Kami menyarankan Anda mencari lokasi atau menawar sewa agar Margin of Safety berada di atas 20%."
          },
          {
            q: "Kenapa hasil evaluasi saya NO-GO meskipun Margin of Safety tinggi?",
            a: "Keputusan akhir algoritma kami menimbang Risiko Bencana (seperti zona banjir yang dalam). Meskipun secara hitungan di atas kertas bisnis Anda untung, kerugian operasional akibat banjir akan melumpuhkan bisnis tersebut."
          }
        ].map((faq, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-5">
            <h4 className="font-bold text-slate-800 text-lg mb-2">{faq.q}</h4>
            <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
