"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface Booking {
  id: string;
  full_name: string;
  phone: string;
  pickup_location: string;
  destination: string;
  booking_type: string;
  vehicle_type: string;
  booking_date: string;
  pickup_time: string;
  price: number;
  status: string;
  assigned_driver: string | null;
}

export default function TrackBooking() {
  const [phone, setPhone] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function handleSearch() {
    if (!phone.trim()) {
      alert("Please enter your phone number.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("phone", phone)
      .order("created_at", { ascending: false });

    setLoading(false);
    setSearched(true);

    if (error) {
      alert(error.message);
      return;
    }

    setBookings(data || []);
  }

  const statusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Assigned":
        return "bg-blue-100 text-blue-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-2">
          Track Your Booking
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Enter your phone number to view your bookings.
        </p>

        <div className="bg-white shadow rounded-xl p-6 flex flex-col md:flex-row gap-4">

          <input
            type="tel"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 border rounded-lg p-3"
          />

          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg"
          >
            {loading ? "Searching..." : "Search"}
          </button>

        </div>

        {searched && bookings.length === 0 && (
          <div className="bg-white rounded-xl shadow p-8 text-center mt-8">
            <h2 className="text-2xl font-semibold">
              No bookings found
            </h2>
            <p className="text-gray-500 mt-2">
              Please check your phone number.
            </p>
          </div>
        )}

        <div className="mt-8 space-y-6">

          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-xl shadow p-6"
            >
              <div className="flex justify-between items-center mb-4">

                <h2 className="font-bold text-xl">
                  Booking #{booking.id.slice(0, 8)}
                </h2>

                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold ${statusColor(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>

              </div>

              <div className="grid md:grid-cols-2 gap-4">

                <p><strong>Customer:</strong> {booking.full_name}</p>

                <p><strong>Driver:</strong> {booking.assigned_driver || "Not Assigned"}</p>

                <p><strong>Pickup:</strong> {booking.pickup_location}</p>

                <p><strong>Destination:</strong> {booking.destination}</p>

                <p><strong>Vehicle:</strong> {booking.vehicle_type}</p>

                <p><strong>Duration:</strong> {booking.booking_type}</p>

                <p><strong>Date:</strong> {booking.booking_date}</p>

                <p><strong>Time:</strong> {booking.pickup_time}</p>

                <p><strong>Price:</strong> ₹{booking.price}</p>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}