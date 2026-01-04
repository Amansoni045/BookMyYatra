"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getMe, logout } from "@/app/lib/auth";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isHotelsPage = pathname.startsWith("/hotels");

  const navLinks = [
    { label: "Home", url: "/" },
    { label: "Hotels", url: "/hotels" },
  ];

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = () => {
      getMe()
        .then((data) => {
          if (data?.name) setUser(data);
          else setUser(null);
        })
        .finally(() => setLoading(false));
    };

    fetchUser();

    window.addEventListener("auth-change", fetchUser);
    return () => window.removeEventListener("auth-change", fetchUser);
  }, []);

  useEffect(() => {
    if (!isHotelsPage) {
      const handleScroll = () => setScrolled(window.scrollY > 15);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isHotelsPage]);

  const isSolid = isHotelsPage || scrolled;

  const handleLogout = async () => {
    await logout();
    setUser(null);
    router.push("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500
        ${isSolid
          ? "bg-white/85 backdrop-blur-xl shadow-lg"
          : "bg-transparent py-5"}
      `}
    >
      <div className="flex items-center justify-between px-4 md:px-16">
        <Link href="/">
          <img
            src="/Assets/logo.png"
            alt="Logo"
            className={`h-16 transition-all duration-500 ${isSolid ? "invert opacity-80" : ""
              }`}
          />
        </Link>

        <div className="hidden md:flex gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className={`relative font-medium tracking-wide transition-colors group
                ${isSolid ? "text-gray-800" : "text-white"}
              `}
            >
              {link.label}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] w-0 group-hover:w-full transition-all duration-300
                  ${isSolid ? "bg-gray-800" : "bg-white"}
                `}
              />
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {!loading && user ? (
            <>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold shadow
                  ${isSolid
                    ? "bg-black text-white"
                    : "bg-white text-black"}
                `}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>

              <span
                className={`font-medium
                  ${isSolid ? "text-gray-800" : "text-white"}
                `}
              >
                {user.name}
              </span>

              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-full bg-black text-white hover:opacity-90 hover:scale-105 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <button
                  className={`px-5 py-2 rounded-full border transition-all duration-300
                    ${isSolid
                      ? "border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
                      : "border-white text-white hover:bg-white hover:text-black"}
                  `}
                >
                  Sign In
                </button>
              </Link>

              <Link href="/auth/signup">
                <button
                  className={`px-5 py-2 rounded-full font-semibold shadow-md hover:scale-105 transition
                    ${isSolid
                      ? "bg-black text-white"
                      : "bg-white text-black"}
                  `}
                >
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>

        <div className="md:hidden">
          <svg
            onClick={() => setMenuOpen(true)}
            className={`h-7 w-7 cursor-pointer transition-colors
              ${isSolid ? "text-gray-800" : "text-white"}
            `}
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
      </div>

      <div
        className={`fixed inset-0 z-50 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-transform duration-500
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <button
          className="absolute top-6 right-6 text-2xl"
          onClick={() => setMenuOpen(false)}
        >
          ✕
        </button>

        {navLinks.map((link) => (
          <Link
            key={link.url}
            href={link.url}
            onClick={() => setMenuOpen(false)}
            className="text-2xl font-medium text-gray-800"
          >
            {link.label}
          </Link>
        ))}

        {!loading && user ? (
          <button
            onClick={handleLogout}
            className="mt-6 px-10 py-3 rounded-full bg-black text-white"
          >
            Logout
          </button>
        ) : (
          <div className="flex gap-4">
            <Link href="/auth/login">
              <button className="px-8 py-3 rounded-full border border-gray-800">
                Sign In
              </button>
            </Link>
            <Link href="/auth/signup">
              <button className="px-8 py-3 rounded-full bg-black text-white">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
