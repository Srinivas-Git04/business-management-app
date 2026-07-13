"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          🚗 DSK DriveMate
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#services" className="hover:text-blue-600">Services</a>
          <a href="#pricing" className="hover:text-blue-600">Pricing</a>
          <a href="#book" className="hover:text-blue-600">Book Driver</a>
          <a href="#contact" className="hover:text-blue-600">Contact</a>

          <Link
            href="/admin"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}