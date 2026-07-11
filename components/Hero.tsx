"use client";

import { ArrowRight, ShieldCheck, Clock3, Star } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-white"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 px-6">

        <div className="flex flex-col justify-center">

          <span className="bg-blue-100 text-blue-700 w-fit px-4 py-2 rounded-full font-medium">
            🚗 Trusted Driver Service
          </span>

          <h1 className="text-6xl font-bold mt-6 leading-tight text-gray-900">
            Your Car.
            <br />
            Our Driver.
            <br />
            <span className="text-blue-600">
              Your Peace of Mind.
            </span>
          </h1>

          <p className="text-gray-700 mt-6 text-lg">
            Hire professional, verified drivers for hourly,
            daily and outstation trips across Telangana.
          </p>

          <div className="flex gap-4 mt-8">
            <button className="bg-blue-600 text-white px-7 py-4 rounded-xl flex items-center gap-2">
              Hire Driver
              <ArrowRight size={20} />
            </button>

            <button className="border px-7 py-4 rounded-xl">
              Learn More
            </button>
          </div>

          <div className="grid grid-cols-3 mt-12 gap-6">

            <div>
              <ShieldCheck className="text-blue-600 mb-2" />
              <p className="font-semibold">Verified</p>
            </div>

            <div>
              <Clock3 className="text-blue-600 mb-2" />
              <p className="font-semibold">24×7</p>
            </div>

            <div>
              <Star className="text-blue-600 mb-2" />
              <p className="font-semibold">Top Rated</p>
            </div>

          </div>

        </div>

        <div className="flex items-center justify-center">
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">
              Book a Driver
            </h2>

            <input
              placeholder="Pickup Location"
              className="w-full border rounded-lg p-3 mb-4"
            />

            <input
              placeholder="Destination"
              className="w-full border rounded-lg p-3 mb-4"
            />

            <input
              placeholder="Hours Required"
              className="w-full border rounded-lg p-3 mb-4"
            />

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
              Check Availability
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}