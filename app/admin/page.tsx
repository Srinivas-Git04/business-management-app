"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import StatCard from "@/components/admin/StatCard";
import SearchBar from "@/components/admin/SearchBar";
import BookingTable from "@/components/admin/BookingTable";
import EditBookingModal from "@/components/admin/EditBookingModal";

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

  const [selectedBooking, setSelectedBooking] =
  useState<Booking | null>(null);

  const [isEditOpen, setIsEditOpen] =
    useState(false);

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
    const { data: bookingData, error: bookingError } = await supabase
      .from("bookings")
      .update({
        driver_id: driver.id,
        assigned_driver: driver.full_name,
        status: "Assigned",
      })
      .eq("id", bookingId)
      .select();

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

async function handleComplete(booking: Booking) {
  if (!booking.driver_id) {
    alert("No driver assigned.");
    return;
  }

  // 1. Mark booking as completed
  const { error: bookingError } = await supabase
    .from("bookings")
    .update({
      status: "Completed",
    })
    .eq("id", booking.id);

  if (bookingError) {
    alert(bookingError.message);
    return;
  }

  // 2. Make driver available again
  const { error: driverError } = await supabase
    .from("drivers")
    .update({
      is_available: true,
    })
    .eq("id", booking.driver_id);

  if (driverError) {
    alert(driverError.message);
    return;
  }

  // 3. Refresh dashboard
  await fetchBookings();
  await fetchDrivers();

  alert("Ride completed successfully!");
} 

async function handleSaveBooking(updatedBooking: Booking) {
  const { data, error } = await supabase
  .from("bookings")
  .update({
    full_name: updatedBooking.full_name,
    phone: updatedBooking.phone,
    pickup_location: updatedBooking.pickup_location,
    destination: updatedBooking.destination,
    booking_type: updatedBooking.booking_type,
    vehicle_type: updatedBooking.vehicle_type,
    price: updatedBooking.price,
  })
  .eq("id", updatedBooking.id)
  .select();

  if (error) {
    alert(error.message);
    return;
  }

  alert("Booking updated successfully!");

  setIsEditOpen(false);
  fetchBookings();
}

async function handleDelete(bookingId: string) {
  const confirmed = confirm(
    "Are you sure you want to delete this booking?"
  );

  if (!confirmed) return;

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Booking deleted successfully!");

  fetchBookings();
}

  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + booking.price,
    0
  );
  const today = new Date().toISOString().split("T")[0];

  const todayRevenue = bookings
    .filter((b) => b.booking_date === today)
    .reduce((sum, b) => sum + b.price, 0);

  const todayBookings = bookings.filter(
  (b) => b.booking_date === today
).length;

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

const monthRevenue = bookings
  .filter((b) => {
    const d = new Date(b.booking_date);
    return (
      d.getMonth() === currentMonth &&
      d.getFullYear() === currentYear
    );
  })
  .reduce((sum, b) => sum + b.price, 0);

  const cancelledBookings = bookings.filter(
  (b) => b.status === "Cancelled"
).length;

  const completedRides = bookings.filter(
    (b) => b.status === "Completed"
  ).length;

  const pendingBookings = bookings.filter(
    (b) => b.status === "Pending"
  ).length;

  const assignedBookings = bookings.filter(
    (b) => b.status === "Assigned"
  ).length;

  const availableDrivers = drivers.filter(
    (d) => d.is_available
  ).length;

  const busyDrivers = drivers.filter(
    (d) => !d.is_available
  ).length;

  const totalDrivers = drivers.length;

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Bookings"
          value={bookings.length}
        />

        <StatCard
          title="Pending Bookings"
          value={pendingBookings}
          color="text-yellow-600"
        />

        <StatCard
          title="Assigned Rides"
          value={assignedBookings}
          color="text-blue-600"
        />

        <StatCard
          title="Completed Rides"
          value={completedRides}
          color="text-green-600"
        />

        <StatCard
          title="Total Drivers"
          value={totalDrivers}
          color="text-purple-600"
        />

        <StatCard
          title="Available Drivers"
          value={availableDrivers}
          color="text-green-600"
        />

        <StatCard
          title="Busy Drivers"
          value={busyDrivers}
          color="text-red-600"
        />

        <StatCard
          title="Revenue"
          value={`₹${totalRevenue}`}
          color="text-emerald-600"
        />

        <StatCard
          title="Today's Revenue"
          value={`₹${todayRevenue}`}
          color="text-blue-700"
        />
        <StatCard
          title="This Month's Revenue"
          value={`₹${monthRevenue}`}
          color="text-indigo-700"
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
        <>
          <BookingTable
            bookings={filteredBookings}
            drivers={drivers}
            onAssign={handleAssign}
            onComplete={handleComplete}
            onDelete={handleDelete}
            onEdit={(booking) => {
              console.log("Booking:", booking);

              setSelectedBooking(booking as any);

              setIsEditOpen(true);

              console.log("Opening modal...");
            }}
          />
          <EditBookingModal
            booking={selectedBooking as any}
            open={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            onSave={handleSaveBooking as any}
          />
        </>
      )}
    </div>
  );
}