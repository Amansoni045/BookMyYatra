"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMe, logout } from "@/app/lib/auth";

const Navbar = () => {
  const pathname = usePathname();
  const isHotelsPage = pathname.startsWith("/hotels");

  const navLinks = [
    { label: "Home", url: "/" },
    { label: "Hotels", url: "/hotels" },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    getMe().then((data) => {
      setUser(data);
      setAuthLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!isHotelsPage) {
      const handleScroll = () => setScrolled(window.scrollY > 10);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isHotelsPage]);

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  const navStyle =
    isHotelsPage || scrolled
      ? "bg-white/80 shadow-md text-gray-700"
      : "text-white py-4";

  return (
    <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 z-50 ${navStyle}`}>
      <Link href="/">
        <img src="/Assets/logo.png" alt="Logo" className="h-16" />
      </Link>

      <div className="hidden md:flex gap-8">
        {navLinks.map((link) => (
          <Link key={link.url} href={link.url}>
            {link.label}
          </Link>
        ))}
      </div>

      <div className="hidden md:flex gap-4">
        {!authLoading && user ? (
          <>
            <span>Hi, {user.name}</span>
            <button onClick={handleLogout} className="bg-black text-white px-5 py-2 rounded-full">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/login">
              <button className="bg-black text-white px-5 py-2 rounded-full">Sign In</button>
            </Link>
            <Link href="/auth/signup">
              <button className="bg-black text-white px-5 py-2 rounded-full">Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
