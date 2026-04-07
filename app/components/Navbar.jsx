"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/AuthContext";
import { Menu, X, User } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";
  const { user, loading, logout } = useAuth();

  const navLinks = [
    { label: "Home", url: "/" },
    { label: "Hotels", url: "/hotels" },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (isHomePage) {
      const handleScroll = () => setScrolled(window.scrollY > 20);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isHomePage]);

  const isSolid = !isHomePage || scrolled;

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-transparent
        ${isSolid
          ? "bg-white/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.05)] border-white/50 py-3"
          : "bg-transparent py-5"}
      `}
    >
      <div className="flex items-center justify-between px-6 md:px-16 lg:px-24">
        <Link href="/">
          <img
            src="/Assets/logo.png"
            alt="Logo"
            className={`h-12 md:h-14 transition-all duration-500 hover:scale-105 ${isSolid ? "invert opacity-90" : "drop-shadow-lg"
              }`}
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 items-center bg-transparent backdrop-blur-none px-6 py-2 rounded-full">
          {navLinks.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className={`relative font-semibold tracking-wide transition-all duration-300 group
                ${isSolid ? "text-gray-800 hover:text-blue-600" : "text-white hover:text-blue-200"}
              `}
            >
              {link.label}
              <span
                className={`absolute left-0 -bottom-1.5 h-[3px] w-0 group-hover:w-full transition-all duration-300 rounded-full
                  ${isSolid ? "bg-blue-600" : "bg-[#00dfd8] shadow-[0_0_8px_#00dfd8]"}
                `}
              />
            </Link>
          ))}

          {!loading && user?.role === "ADMIN" && (
            <Link
              href="/admin/dashboard"
              className={`font-semibold px-4 py-2 rounded-full transition-all flex items-center gap-2
                ${isSolid
                  ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-md"}
              `}
            >
              Admin Panel
            </Link>
          )}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4">
          {!loading && user ? (
            <div className="flex items-center gap-4">
              <div
                className={`flex items-center gap-3 px-4 py-1.5 rounded-full shadow-sm transition-all
                  ${isSolid ? "bg-gray-50 border border-gray-100" : "bg-white/10 border border-white/20 backdrop-blur-sm"}
                `}
              >
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                    ${isSolid ? "bg-blue-600 text-white" : "bg-white text-blue-600"}
                 `}>
                    {user.name.charAt(0).toUpperCase()}
                 </div>
                 <span className={`font-semibold text-sm mr-2 ${isSolid ? "text-gray-800" : "text-white"}`}>
                   {user.name}
                 </span>
              </div>

              <button
                onClick={handleLogout}
                className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all transform hover:scale-105 shadow-md
                  ${isSolid ? "bg-gray-900 text-white hover:bg-black" : "bg-white text-gray-900 hover:bg-gray-100"}
                `}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/auth/login">
                <button
                  className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2
                    ${isSolid
                      ? "text-gray-800 hover:bg-gray-100"
                      : "text-white hover:bg-white/20"}
                  `}
                >
                  <User className="w-4 h-4" /> Sign In
                </button>
              </Link>

              <Link href="/auth/signup">
                <button
                  className={`px-7 py-2.5 rounded-full font-bold text-sm shadow-xl transition-all transform hover:scale-105
                    ${isSolid ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-blue-500/30" : "bg-white text-blue-800 hover:shadow-white/20"}
                  `}
                >
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`p-2 rounded-full transition-all ${isSolid ? "text-gray-800 bg-gray-50" : "text-white bg-white/10"
              }`}
          >
             {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-3xl flex flex-col items-center justify-center gap-8 transition-transform duration-500 shadow-2xl
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <button
          className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-all"
          onClick={() => setMenuOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>

        <img src="/Assets/logo.png" alt="Logo" className="h-16 invert opacity-80 mb-6" />

        {navLinks.map((link) => (
          <Link
            key={link.url}
            href={link.url}
            onClick={() => setMenuOpen(false)}
            className="text-3xl font-black text-gray-800 hover:text-blue-600 transition-all tracking-tight"
          >
            {link.label}
          </Link>
        ))}

        {!loading && user?.role === "ADMIN" && (
          <Link
            href="/admin/dashboard"
            onClick={() => setMenuOpen(false)}
            className="text-2xl font-bold text-gray-800 bg-gray-100 px-6 py-2 rounded-full mt-4"
          >
            Admin Panel
          </Link>
        )}

        {!loading && user ? (
          <div className="flex flex-col items-center mt-8 gap-4">
            <div className="flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-full shadow-inner border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                   {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-bold text-gray-900 text-xl">{user.name}</span>
            </div>
            <button
              onClick={() => { handleLogout(); setMenuOpen(false); }}
              className="mt-4 px-12 py-4 rounded-full bg-black text-white font-bold text-lg hover:shadow-2xl transition-all"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 mt-8 w-3/4 max-w-sm">
            <Link href="/auth/login" onClick={() => setMenuOpen(false)}>
              <button className="w-full py-4 rounded-full border-2 border-gray-800 text-gray-900 font-bold text-lg transition-all hover:bg-gray-50">
                Sign In
              </button>
            </Link>
            <Link href="/auth/signup" onClick={() => setMenuOpen(false)}>
              <button className="w-full py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg shadow-xl hover:shadow-blue-500/40 transition-all">
                Create Account
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
