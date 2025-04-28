"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const App = () => {
  const navLinks = [
    { label: "Home", url: "/" },
    { label: "Hotels", url: "/hotels" },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 transition-all duration-500 z-50 ${
        scrolled ? "bg-white/80 shadow-md text-gray-700" : "text-white py-4"
      }`}
    >
      <Link href="/" className="flex items-center">
        <img
          src="/Assets/logo.png"
          alt="Logo"
          className={`h-16 ${scrolled ? "invert opacity-80" : ""}`}
        />
      </Link>

      <div className="hidden md:flex flex-grow items-center justify-center gap-8">
        {navLinks.map((link, index) => (
          <Link key={index} href={link.url} className={`group ${scrolled ? "text-gray-700" : "text-white"}`}>
            {link.label}
            <div
              className={`${scrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all`}
            />
          </Link>
        ))}
      </div>

      <div className="hidden md:flex items-center">
        <button className="bg-black text-white px-5 py-2 rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105">
          Login
        </button>
      </div>

      <div className="flex items-center md:hidden">
        <svg
          onClick={() => setMenuOpen(!menuOpen)}
          className={`h-6 w-6 cursor-pointer ${scrolled ? "invert" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </div>

      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col items-center justify-center gap-6 font-medium text-gray-800 transition-all ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setMenuOpen(false)}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {navLinks.map((link, index) => (
          <Link key={index} href={link.url} className="text-gray-800" onClick={() => setMenuOpen(false)}>
            {link.label}
          </Link>
        ))}

        <button className="bg-black text-white px-8 py-2.5 rounded-full hover:bg-gray-800 transition-all duration-500 hover:scale-105">
          Login
        </button>
      </div>
    </nav>
  );
};

export default App;
