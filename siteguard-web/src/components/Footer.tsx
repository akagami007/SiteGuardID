import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col">
          <span className="font-bold text-lg text-slate-800">
            SiteGuard<span className="text-indigo-600">ID</span>
          </span>
          <span className="text-xs text-slate-500 mt-1">© {new Date().getFullYear()} SiteGuard ID. Business Site Due Diligence.</span>
        </div>
        <div className="flex gap-6 text-sm font-medium text-slate-500">
          <Link href="/about" className="hover:text-indigo-600 transition-colors">Tentang Kami</Link>
          <Link href="/privacy" className="hover:text-indigo-600 transition-colors">Kebijakan Privasi</Link>
          <Link href="/help" className="hover:text-indigo-600 transition-colors">Bantuan</Link>
        </div>
      </div>
    </footer>
  );
}
