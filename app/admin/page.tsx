"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import StatCard from "@/components/admin/StatCard";
import SearchBar from "@/components/admin/SearchBar";
import BookingTable from "@/components/admin/BookingTable";

interface Driver {
  id: string;
  full_name: string;
  is_available: boolean;
}

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
  driver_id?: string | null;
  assigned_driver?: string | null;
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBookings();
    fetchDrivers();
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

  async function fetchDrivers() {
    const { data, error } = await supabase
      .from("drivers")
      .select("*")
      .order("full_name", { ascending: true });

    if (error) {
      console.error(error.message);
      return;
    }

    setDrivers(data || []);
  }

  async function handleAssign(
    bookingId: string,
    driverId: string
  ) {
    if (!driverId) {
      alert("Please select a driver.");
      return;
    }

    const driver = drivers.find((d) => d.id === driverId);

    if (!driver) {
      alert("Driver not found.");
      return;
    }

    // Update booking
    const { error: bookingError } = await supabase
      .from("bookings")
      .update({
        driver_id: driver.id,
        assigned_driver: driver.full_name,
        status: "Assigned",
      })
      .eq("id", bookingId);

    if (bookingError) {
      alert(bookingError.message);
      return;
    }

    // Update driver
    const { error: driverError } = await supabase
      .from("drivers")
      .update({
        is_available: false,
      })
      .eq("id", driver.id);

    if (driverError) {
      alert(driverError.message);
      return;
    }

    alert("Driver assigned successfully!");

    fetchBookings();
    fetchDrivers();
  }

  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + booking.price,
    0
  );

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.full_name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
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
            bookings.filter(
              (b) => b.status === "Pending"
            ).length
          }
          color="text-yellow-600"
        />

        <StatCard
          title="Assigned"
          value={
            bookings.filter(
              (b) => b.status === "Assigned"
            ).length
          }
          color="text-blue-600"
        />

        <StatCard
          title="Revenue"
          value={`₹${totalRevenue}`}
          color="text-green-600"
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
        <BookingTable
          bookings={filteredBookings}
          drivers={drivers}
          onAssign={handleAssign}
        />
      )}
    </div>
  );
}