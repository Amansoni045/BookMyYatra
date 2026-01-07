"use client";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white p-6">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="space-y-3">
        <Link href="/admin/dashboard">Dashboard</Link>
        <Link href="/admin/hotels">Hotels</Link>
      </nav>
    </aside>
  );
}
