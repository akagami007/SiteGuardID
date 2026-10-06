"use client";

import { useState } from "react";

import DynamicMap from "@/components/DynamicMap";

export default function Home() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    location_name: "Ruko Baru Kemang",
    latitude: -6.2625,
    longitude: 106.8141,
    business_type: "cafe",
    capex: 150000000,
    rent_per_year: 75000000,
    rent_duration: 2,
    target_revenue: 40000000,
    gross_margin: 55,
    monthly_fixed_cost: 6000000,
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMapChange = (lat: number, lng: number) => {
    setFormData({ ...formData, latitude: lat, longitude: lng });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const analyzeLocation = async () => {
    setLoading(true);
    setStep(4); // Moving to loading/result step

    try {
      const response = await fetch("http://127.0.0.1:8000/api/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error evaluating location:", error);
      alert("Gagal terhubung ke backend API.");
      setStep(3);
    } finally {
      setLoading(false);
    }
  };

  // Helper for currency format
  const formatIDR = (num: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xl">S</div>
          <span className="font-bold text-xl tracking-tight text-slate-800">SiteGuard<span className="text-indigo-600">ID</span></span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto p-6 mt-8">
        {step < 4 && (
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Evaluasi Kelayakan Lokasi</h1>
            <p className="text-slate-500">Jangan bayar deposit sebelum Anda yakin 100%.</p>
            
            {/* Progress Bar */}
            <div className="flex items-center gap-2 mt-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`h-2 flex-1 rounded-full ${step >= i ? 'bg-indigo-600' : 'bg-slate-200'}`} />
              ))}
            </div>
          </div>
        )}

        {/* Step 1: Lokasi */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold mb-6">Langkah 1: Profil Lokasi & Bisnis</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama / Alamat Target Lokasi</label>
                <input type="text" name="location_name" value={formData.location_name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tentukan Titik Peta</label>
                <DynamicMap 
                  initialLat={formData.latitude} 
                  initialLng={formData.longitude} 
                  onChange={handleMapChange} 
                />
                <div className="flex justify-between mt-2 text-xs text-slate-500 font-mono bg-slate-100 p-2 rounded">
                  <span>Lat: {formData.latitude.toFixed(6)}</span>
                  <span>Lng: {formData.longitude.toFixed(6)}</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tipe Bisnis</label>
                <select name="business_type" value={formData.business_type} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white outline-none">
                  <option value="cafe">F&B - Cafe / Kedai Kopi</option>
                  <option value="resto">F&B - Restoran</option>
                  <option value="laundry">Laundry</option>
                  <option value="retail">Toko Retail / Minimarket</option>
                </select>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button onClick={nextStep} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-md shadow-indigo-200">Lanjut ke Biaya Modal</button>
            </div>
          </div>
        )}

        {/* Step 2: Capex */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold mb-6">Langkah 2: Biaya Modal (Capex)</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Harga Sewa per Tahun (Rp)</label>
                <input type="number" name="rent_per_year" value={formData.rent_per_year} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Durasi Kontrak Sewa (Tahun)</label>
                <input type="number" name="rent_duration" value={formData.rent_duration} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Anggaran Renovasi & Beli Alat (Rp)</label>
                <input type="number" name="capex" value={formData.capex} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none" />
              </div>
            </div>
            <div className="mt-8 flex justify-between">
              <button onClick={prevStep} className="text-slate-500 hover:text-slate-800 font-semibold py-3 px-6">Kembali</button>
              <button onClick={nextStep} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-md shadow-indigo-200">Lanjut ke Operasional</button>
            </div>
          </div>
        )}

        {/* Step 3: Operasional */}
        {step === 3 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl font-bold mb-6">Langkah 3: Target Operasional</h2>
            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-end mb-1">
                  <label className="block text-sm font-medium text-slate-700">Target Omzet per Bulan (Rp)</label>
                </div>
                <input type="number" name="target_revenue" value={formData.target_revenue} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none" />
              </div>
              <div>
                <div className="flex justify-between items-end mb-1">
                  <label className="block text-sm font-medium text-slate-700">Margin Kotor (%)</label>
                  <button className="text-xs text-indigo-600 font-medium bg-indigo-50 px-2 py-1 rounded-md">Gunakan Standar Industri</button>
                </div>
                <input type="number" name="gross_margin" value={formData.gross_margin} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Biaya Tetap per Bulan (Rp) <span className="font-normal text-slate-400">- Gaji, Listrik, Air (Bukan sewa)</span></label>
                <input type="number" name="monthly_fixed_cost" value={formData.monthly_fixed_cost} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none" />
              </div>
            </div>
            <div className="mt-8 flex justify-between">
              <button onClick={prevStep} className="text-slate-500 hover:text-slate-800 font-semibold py-3 px-6">Kembali</button>
              <button onClick={analyzeLocation} className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-md shadow-emerald-200 flex items-center gap-2">
                Analisis Kelayakan
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Loading / Result */}
        {step === 4 && (
          <div className="animate-in fade-in duration-700">
            {loading || !result ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-6"></div>
                <h2 className="text-2xl font-bold text-slate-800">Menganalisis Titik Lokasi...</h2>
                <p className="text-slate-500 mt-2 text-center max-w-md">Mesin SiteGuard sedang menarik data banjir InaRISK, menghitung radius kompetitor OSM, dan mensimulasikan margin of safety Anda.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Decision Banner */}
                <div className={`p-8 rounded-3xl text-white shadow-lg relative overflow-hidden ${
                  result.decision === 'GO' ? 'bg-gradient-to-br from-emerald-500 to-emerald-700' :
                  result.decision === 'REVIEW' ? 'bg-gradient-to-br from-amber-500 to-amber-600' :
                  'bg-gradient-to-br from-rose-500 to-rose-700'
                }`}>
                  <div className="relative z-10">
                    <span className="uppercase tracking-widest text-sm font-bold opacity-80 mb-1 block">Rekomendasi Keputusan</span>
                    <h1 className="text-5xl font-black mb-4 tracking-tight">{result.decision}</h1>
                    
                    <p className="text-lg opacity-90 max-w-2xl">
                      {result.decision === 'GO' && 'Lokasi ini sangat ideal. Risiko operasional rendah dan margin safety sangat sehat untuk investasi Anda.'}
                      {result.decision === 'REVIEW' && 'Ada beberapa red flag. Anda mungkin perlu menegosiasi ulang harga sewa atau menyiapkan strategi pemasaran ekstra.'}
                      {result.decision === 'NO-GO' && 'Tinggalkan lokasi ini. Margin of safety Anda terlalu tipis atau lokasi berada di zona rawan bencana tinggi.'}
                    </p>
                  </div>
                  
                  {/* Decorative element */}
                  <svg className="absolute right-0 top-0 opacity-10 w-64 h-64 transform translate-x-16 -translate-y-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </div>

                {/* Score Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Financials */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </div>
                      <h3 className="font-bold text-lg text-slate-800">Analisis Finansial</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-500">Margin of Safety</span>
                          <span className={`font-bold ${result.results.financial.margin_of_safety > 20 ? 'text-emerald-600' : 'text-rose-600'}`}>{result.results.financial.margin_of_safety}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2"><div className={`h-2 rounded-full ${result.results.financial.margin_of_safety > 20 ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{width: `${Math.min(100, Math.max(0, result.results.financial.margin_of_safety))}%`}}></div></div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <span className="block text-xs text-slate-500 mb-1">Payback Period</span>
                          <span className="font-bold text-slate-800">{result.results.financial.payback_period_months} Bulan</span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <span className="block text-xs text-slate-500 mb-1">Net Profit (Est)</span>
                          <span className="font-bold text-slate-800">{formatIDR(result.results.financial.net_profit_per_month)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hazard */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                      </div>
                      <h3 className="font-bold text-lg text-slate-800">Risiko Bencana</h3>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 mb-2">
                      <span className="text-slate-600 font-medium">Status Kerawanan</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        result.results.hazard.risk_level === 'High' ? 'bg-rose-100 text-rose-700' :
                        result.results.hazard.risk_level === 'Medium' ? 'bg-amber-100 text-amber-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>{result.results.hazard.risk_level} Risk</span>
                    </div>
                    <p className="text-sm text-slate-500 mt-3">{result.results.hazard.notes}</p>
                  </div>

                  {/* Market */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      </div>
                      <h3 className="font-bold text-lg text-slate-800">Persaingan Pasar</h3>
                    </div>
                    <div className="flex items-end gap-2 mb-2">
                      <span className="text-4xl font-black text-slate-800">{result.results.market.competitor_count_2km}</span>
                      <span className="text-slate-500 pb-1">Kompetitor sejenis dalam 2km</span>
                    </div>
                    <p className="text-sm text-slate-500">Density: <span className="font-semibold text-slate-700">{result.results.market.density}</span></p>
                  </div>

                  {/* Actions */}
                  <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-sm flex flex-col justify-center">
                    <h3 className="font-bold text-lg mb-2">Gunakan Laporan Ini</h3>
                    <p className="text-slate-400 text-sm mb-6">Gunakan PDF laporan ini sebagai argumen untuk menawar harga sewa ke pemilik ruko.</p>
                    <button className="bg-white text-slate-900 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-100 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      Cetak Laporan PDF
                    </button>
                  </div>

                </div>
                
                <div className="mt-8 flex justify-center">
                   <button onClick={() => setStep(1)} className="text-slate-500 font-medium hover:text-slate-800 underline">Cari Lokasi Lain</button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
