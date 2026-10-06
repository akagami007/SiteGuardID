"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/reports");
        const data = await res.json();
        setReports(data);
      } catch (error) {
        console.error("Gagal mengambil laporan:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchReports();
  }, []);

  const formatIDR = (num: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  return (
    <div className="max-w-6xl mx-auto w-full px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 mt-1">Pantau riwayat evaluasi kelayakan lokasi bisnis Anda.</p>
        </div>
        <Link href="/analyze" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md shadow-indigo-200 inline-flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Mulai Analisis Baru
        </Link>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
            {reports.length}
          </div>
          <div>
            <h3 className="text-slate-500 text-sm font-medium">Total Analisis</h3>
            <p className="text-xl font-bold text-slate-800">Lokasi Dievaluasi</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xl">
            {reports.filter(r => r.decision === 'GO').length}
          </div>
          <div>
            <h3 className="text-slate-500 text-sm font-medium">Rekomendasi GO</h3>
            <p className="text-xl font-bold text-slate-800">Lokasi Layak</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold text-xl">
            {reports.filter(r => r.decision === 'NO-GO').length}
          </div>
          <div>
            <h3 className="text-slate-500 text-sm font-medium">Rekomendasi NO-GO</h3>
            <p className="text-xl font-bold text-slate-800">Dihindari</p>
          </div>
        </div>
      </div>

      {/* History Table */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Riwayat Laporan Terbaru</h2>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-slate-500">Memuat data...</div>
        ) : reports.length === 0 ? (
          <div className="p-10 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-700">Belum ada analisis</h3>
            <p className="text-slate-500 mt-1 max-w-sm">Mulai analisis pertama Anda untuk melihat evaluasi kelayakan lokasi secara data-driven.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-medium">Tanggal</th>
                  <th className="px-6 py-4 font-medium">Lokasi & Tipe</th>
                  <th className="px-6 py-4 font-medium">Capex</th>
                  <th className="px-6 py-4 font-medium">Net Profit (Est)</th>
                  <th className="px-6 py-4 font-medium">Keputusan</th>
                  <th className="px-6 py-4 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-slate-500">{formatDate(report.created_at)}</td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{report.location_name}</div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider">{report.business_type}</div>
                    </td>
                    <td className="px-6 py-4 font-mono">{formatIDR(report.parameters.capex)}</td>
                    <td className="px-6 py-4 font-mono text-emerald-600 font-medium">
                      {report.results.financial?.net_profit_per_month ? formatIDR(report.results.financial.net_profit_per_month) : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        report.decision === 'GO' ? 'bg-emerald-100 text-emerald-700' :
                        report.decision === 'REVIEW' ? 'bg-amber-100 text-amber-700' :
                        'bg-rose-100 text-rose-700'
                      }`}>
                        {report.decision}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">Lihat Detail</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
