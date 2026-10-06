"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import DynamicMap from "@/components/DynamicMap"; // Although we might not need interactivity, showing the pin is good

export default function ReportDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReport() {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/reports/${id}`);
        if (!res.ok) throw new Error("Report not found");
        const data = await res.json();
        setReport(data);
      } catch (error) {
        console.error("Gagal mengambil laporan detail:", error);
        alert("Laporan tidak ditemukan.");
        router.push("/");
      } finally {
        setLoading(false);
      }
    }
    
    if (id) fetchReport();
  }, [id, router]);

  const formatIDR = (num: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium">Memuat detail laporan...</p>
      </div>
    );
  }

  if (!report) return null;

  return (
    <main className="max-w-4xl mx-auto px-6 py-10 w-full flex-grow">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link href="/" className="text-sm font-medium text-slate-500 hover:text-indigo-600 flex items-center gap-1 mb-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Kembali ke Dashboard
          </Link>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{report.location_name}</h1>
          <div className="flex gap-3 mt-2 text-sm text-slate-500 font-medium">
            <span className="uppercase tracking-wider px-2 py-1 bg-slate-200 rounded">{report.business_type}</span>
            <span>{new Date(report.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit' })}</span>
          </div>
        </div>
        <button onClick={() => window.print()} className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded-xl shadow transition flex items-center gap-2 print:hidden">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
          Cetak PDF
        </button>
      </div>

      {/* Decision Banner */}
      <div className={`p-8 rounded-3xl text-white shadow-lg relative overflow-hidden mb-8 ${
        report.decision === 'GO' ? 'bg-gradient-to-br from-emerald-500 to-emerald-700' :
        report.decision === 'REVIEW' ? 'bg-gradient-to-br from-amber-500 to-amber-600' :
        'bg-gradient-to-br from-rose-500 to-rose-700'
      }`}>
        <div className="relative z-10">
          <span className="uppercase tracking-widest text-sm font-bold opacity-80 mb-1 block">Rekomendasi Keputusan</span>
          <h2 className="text-5xl font-black mb-2 tracking-tight">{report.decision}</h2>
          <p className="text-lg opacity-90 max-w-2xl">
            {report.decision === 'GO' && 'Lokasi ini sangat ideal. Risiko operasional rendah dan margin safety sangat sehat untuk investasi Anda.'}
            {report.decision === 'REVIEW' && 'Ada beberapa red flag. Anda mungkin perlu menegosiasi ulang harga sewa atau menyiapkan strategi pemasaran ekstra.'}
            {report.decision === 'NO-GO' && 'Tinggalkan lokasi ini. Margin of safety Anda terlalu tipis atau lokasi berada di zona rawan bencana tinggi.'}
          </p>
        </div>
        <svg className="absolute right-0 top-0 opacity-10 w-64 h-64 transform translate-x-16 -translate-y-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
      </div>

      {/* Grid Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Map Snapshot */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 overflow-hidden">
           <h3 className="font-bold text-lg text-slate-800 mb-4">Lokasi Geografis</h3>
           <div className="pointer-events-none rounded-xl overflow-hidden border border-slate-100">
             <DynamicMap initialLat={report.latitude} initialLng={report.longitude} onChange={() => {}} />
           </div>
        </div>

        {/* Financial Recap */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-bold text-lg text-slate-800 mb-4">Parameter Input Finansial</h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-slate-50">
              <span className="text-slate-500">Biaya Modal (Capex)</span>
              <span className="font-medium text-slate-800">{formatIDR(report.parameters.capex)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-50">
              <span className="text-slate-500">Sewa per Tahun</span>
              <span className="font-medium text-slate-800">{formatIDR(report.parameters.rent_per_year)} ({report.parameters.rent_duration} thn)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-50">
              <span className="text-slate-500">Target Omzet (Bulan)</span>
              <span className="font-medium text-slate-800">{formatIDR(report.parameters.target_revenue)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-slate-500">Biaya Tetap (Bulan)</span>
              <span className="font-medium text-slate-800">{formatIDR(report.parameters.monthly_fixed_cost)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Engine Results */}
      <h3 className="font-bold text-xl text-slate-800 mb-4">Rincian Mesin Evaluasi</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Financial Engine Result */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h4 className="font-bold text-slate-800 mb-4">Finansial</h4>
          <div className="mb-4">
            <div className="text-sm text-slate-500 mb-1">Margin of Safety</div>
            <div className={`text-2xl font-black ${report.results.financial.margin_of_safety > 20 ? 'text-emerald-600' : 'text-rose-600'}`}>
              {report.results.financial.margin_of_safety}%
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100">
            <div>
              <span className="block text-xs text-slate-500">Payback Period</span>
              <span className="font-bold text-slate-700">{report.results.financial.payback_period_months} Bln</span>
            </div>
            <div>
              <span className="block text-xs text-slate-500">Net Profit</span>
              <span className="font-bold text-slate-700">{formatIDR(report.results.financial.net_profit_per_month)}</span>
            </div>
          </div>
        </div>

        {/* Hazard Engine Result */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h4 className="font-bold text-slate-800 mb-4">Risiko Bencana</h4>
          <div className="mb-4">
            <div className="text-sm text-slate-500 mb-1">Status Kerawanan</div>
            <span className={`px-3 py-1 inline-block mt-1 rounded-full text-sm font-bold ${
              report.results.hazard.risk_level === 'High' ? 'bg-rose-100 text-rose-700' :
              report.results.hazard.risk_level === 'Medium' ? 'bg-amber-100 text-amber-700' :
              'bg-emerald-100 text-emerald-700'
            }`}>{report.results.hazard.risk_level} Risk</span>
          </div>
          <p className="text-xs text-slate-500 mt-4 pt-4 border-t border-slate-100">{report.results.hazard.notes}</p>
        </div>

        {/* Market Engine Result */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h4 className="font-bold text-slate-800 mb-4">Persaingan Pasar</h4>
          <div className="mb-4">
            <div className="text-sm text-slate-500 mb-1">Kompetitor Terdekat (2km)</div>
            <div className="text-4xl font-black text-slate-800">
              {report.results.market.competitor_count_2km}
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-4 pt-4 border-t border-slate-100">{report.results.market.notes}</p>
        </div>
      </div>
    </main>
  );
}
