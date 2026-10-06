import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xl">S</div>
        <span className="font-bold text-xl tracking-tight text-slate-800">
          SiteGuard<span className="text-indigo-600">ID</span>
        </span>
      </Link>
      <div className="flex gap-6 items-center">
        <Link href="/" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Dashboard</Link>
        <Link href="/analyze" className="text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors">
          + Evaluasi Baru
        </Link>
      </div>
    </nav>
  );
}
