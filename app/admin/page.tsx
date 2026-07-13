"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import StatCard from "@/components/admin/StatCard";
import SearchBar from "@/components/admin/SearchBar";
import BookingTable from "@/components/admin/BookingTable";

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
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    setLoading(true);

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

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

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.full_name.toLowerCase().includes(search.toLowerCase()) ||
      booking.phone.includes(search)
  );

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        🚗 DSK DriveMate Admin Dashboard
      </h1>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
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

      {/* Search */}
      <SearchBar
        value={search}
        onChange={setSearch}
      />

      {/* Booking Table */}
      {loading ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          Loading bookings...
        </div>
      ) : (
        <BookingTable bookings={filteredBookings} />
      )}
    </div>
  );
}