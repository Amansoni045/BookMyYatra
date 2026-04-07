"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-16 pb-8 px-6 md:px-16 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-3 mb-6 transition-transform hover:scale-105 inline-flex">
            <img src="/Assets/logo.png" alt="Logo" className="h-14 brightness-0 invert" />
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed max-w-md">
            Experience the world's most luxurious destinations with seamless booking, transparent pricing, and 24/7 world-class support. Redefining your travel journey, one perfectly planned stay at a time.
          </p>
          <div className="flex gap-5 mt-8">
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-blue-600 hover:text-white transition-all hover:-translate-y-1">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-pink-600 hover:text-white transition-all hover:-translate-y-1">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-blue-400 hover:text-white transition-all hover:-translate-y-1">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-white font-black tracking-wide mb-6 text-lg uppercase text-sm">Explore</h3>
          <ul className="space-y-3 text-gray-400 font-medium text-sm">
            <li>
              <Link href="/" className="hover:text-blue-500 transition-colors flex items-center gap-2">
                <span className="w-1 h-1 bg-current rounded-full"></span> Home
              </Link>
            </li>
            <li>
              <Link href="/hotels" className="hover:text-blue-500 transition-colors flex items-center gap-2">
                 <span className="w-1 h-1 bg-current rounded-full"></span> Top Hotels
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-blue-500 transition-colors flex items-center gap-2">
                 <span className="w-1 h-1 bg-current rounded-full"></span> About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-blue-500 transition-colors flex items-center gap-2">
                 <span className="w-1 h-1 bg-current rounded-full"></span> Contact Support
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-black tracking-wide mb-6 text-lg uppercase text-sm">Contact</h3>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
              <span>123 Innovation Drive,<br/> Tech Hub, NY 10001</span>
            </li>
            <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
              <Phone className="w-5 h-5 text-blue-500 shrink-0" />
              <span>+1 (800) 123-4567</span>
            </li>
            <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
              <Mail className="w-5 h-5 text-blue-500 shrink-0" />
              <span>reservations@bookmyyatra.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800/80 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 font-medium">
        <p>&copy; {new Date().getFullYear()} BookMyYatra Inc. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="#" className="hover:text-gray-300">Privacy Policy</Link>
          <Link href="#" className="hover:text-gray-300">Terms of Service</Link>
          <Link href="#" className="hover:text-gray-300">Cookie Settings</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
