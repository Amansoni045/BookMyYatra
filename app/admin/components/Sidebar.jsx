"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const linkClass = (path) =>
    `group flex items-center gap-3 px-5 py-3.5 rounded-xl transition-all duration-300 ${pathname.startsWith(path)
      ? "bg-blue-50 text-blue-600 font-semibold border-l-4 border-blue-600"
      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    }`;

  return (
    <aside className="w-72 bg-white border-r border-gray-200 p-8 shadow-sm">
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 pb-4 border-b border-gray-200">
          Admin Panel
        </h2>
      </div>

      <nav className="space-y-2">
        <Link href="/admin/dashboard" className={linkClass("/admin/dashboard")}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Dashboard</span>
        </Link>

        <Link href="/admin/hotels" className={linkClass("/admin/hotels")}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span>Hotels</span>
        </Link>
      </nav>
    </aside>
  );
}
