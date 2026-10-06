export default function PrivacyPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 w-full flex-grow">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Kebijakan Privasi</h1>
      
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-2">1. Pengumpulan Data</h2>
          <p className="text-slate-600 leading-relaxed text-sm">
            Saat Anda menggunakan SiteGuard ID untuk mengevaluasi lokasi, kami mengumpulkan data kueri 
            berupa koordinat geografis (Latitude, Longitude), jenis bisnis, serta parameter finansial 
            simulasi (seperti target omzet dan biaya modal). Data ini digunakan semata-mata untuk memproses 
            dan mengembalikan hasil evaluasi (*scoring*) ke layar Anda.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-2">2. Penyimpanan & Keamanan</h2>
          <p className="text-slate-600 leading-relaxed text-sm">
            Data pencarian lokasi disimpan secara anonim dalam *database* kami untuk keperluan riwayat 
            (*Dashboard History*). Kami tidak menjual data lokasi target sewa Anda kepada agen properti 
            pihak ketiga. Infrastruktur kami dilindungi standar enkripsi yang aman.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-2">3. Data Pihak Ketiga</h2>
          <p className="text-slate-600 leading-relaxed text-sm">
            Laporan kami bergantung pada data *open-source* dan publik (OpenStreetMap, BNPB InaRISK, BMKG). 
            SiteGuard ID tidak bertanggung jawab atas ketidakakuratan data yang bersumber dari lembaga 
            tersebut, namun kami selalu berusaha melakukan kurasi *database* secara berkala (melalui 
            impor *snapshot* data).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-800 mb-2">4. Keputusan Bisnis</h2>
          <p className="text-slate-600 leading-relaxed text-sm">
            Skor kelayakan (GO, REVIEW, NO-GO) bersifat **Rekomendasi Keputusan (Decision Support System)**. 
            Risiko investasi bisnis sepenuhnya berada di tangan Anda. Kami merekomendasikan Anda untuk 
            tetap melakukan observasi lapangan secara langsung *(foot traffic check)* selain bergantung 
            pada laporan digital kami.
          </p>
        </section>

        <div className="pt-6 border-t border-slate-100">
          <p className="text-sm text-slate-500">
            Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}. 
            Jika ada pertanyaan terkait privasi data, hubungi kami melalui menu Bantuan.
          </p>
        </div>
      </div>
    </main>
  );
}
