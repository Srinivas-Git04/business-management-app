"use client";

import { Car } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <div className="flex items-center gap-2">
          <Car className="text-blue-600" size={32} />
          <h1 className="text-2xl font-bold">
            DSK <span className="text-blue-600">DriveMate</span>
          </h1>
        </div>

        <div className="hidden md:flex items-center gap-8 font-medium text-gray-800">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">
          Hire Driver
        </button>

      </div>
    </nav>
  );
}