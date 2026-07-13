"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import StatCard from "@/components/admin/StatCard";

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
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    setLoading(true);

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setBookings(data || []);
    setLoading(false);
  }

  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + booking.price,
    0
  );

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        🚗 DSK DriveMate Admin Dashboard
      </h1>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Total Bookings"
          value={bookings.length}
        />

        <StatCard
          title="Pending"
          value={
            bookings.filter((b) => b.status === "Pending").length
          }
          color="text-yellow-600"
        />

        <StatCard
          title="Completed"
          value={
            bookings.filter((b) => b.status === "Completed").length
          }
          color="text-green-600"
        />

        <StatCard
          title="Revenue"
          value={`₹${totalRevenue}`}
          color="text-blue-600"
        />
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">

          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Pickup</th>
              <th className="p-4 text-left">Destination</th>
              <th className="p-4 text-left">Plan</th>
              <th className="p-4 text-left">Vehicle</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="text-center p-6">
                  Loading...
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center p-6">
                  No bookings found.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-4">{booking.full_name}</td>
                  <td className="p-4">{booking.phone}</td>
                  <td className="p-4">{booking.pickup_location}</td>
                  <td className="p-4">{booking.destination}</td>
                  <td className="p-4">{booking.booking_type}</td>
                  <td className="p-4">{booking.vehicle_type}</td>
                  <td className="p-4 font-semibold">
                    ₹{booking.price}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "Assigned"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}