"use client";

import dynamic from "next/dynamic";

const MapPicker = dynamic(() => import("./MapPicker"), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200">
      <span className="text-slate-500 font-medium">Memuat Peta...</span>
    </div>
  ),
});

export default MapPicker;
