"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import BookingTable from "@/components/admin/BookingTable";
import SearchBar from "@/components/admin/SearchBar";
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

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [assignModal, setAssignModal] = useState(false);

  const [selectedBooking, setSelectedBooking] =
    useState<Booking | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    fetchBookings();
    fetchDrivers();
  }, []);

async function fetchBookings() {
    setLoading(true);
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("booking_date", { ascending: false });

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
    .order("full_name");

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

  fetchBookings();
  fetchDrivers();

  alert("Driver assigned successfully!");
}

async function handleComplete(booking: Booking) {
  if (!booking.driver_id) {
    alert("No driver assigned.");
    return;
  }

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

  fetchBookings();
  fetchDrivers();

  alert("Ride completed!");
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

  fetchBookings();

  alert("Booking deleted successfully!");
}

async function handleSaveBooking(updatedBooking: Booking) {
  const { error } = await supabase
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
    .eq("id", updatedBooking.id);

  if (error) {
    alert(error.message);
    return;
  }

  setIsEditOpen(false);

  fetchBookings();

  alert("Booking updated successfully!");
}

async function assignDriver(booking: any) {
  setSelectedBooking(booking);

  const { data, error } = await supabase
    .from("drivers")
    .select("*")
    .eq("is_available", true)
    .order("full_name");

  if (error) {
    alert(error.message);
    return;
  }

  setDrivers(data || []);
  setAssignModal(true);
}

const filteredBookings = bookings.filter(
  (booking) =>
    booking.full_name.toLowerCase().includes(search.toLowerCase()) ||
    booking.phone.toLowerCase().includes(search.toLowerCase()) ||
    booking.pickup_location.toLowerCase().includes(search.toLowerCase()) ||
    booking.destination.toLowerCase().includes(search.toLowerCase())
);

return (
  <div>

    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold">
        📋 Booking Management
      </h1>
    </div>

    <SearchBar
      value={search}
      onChange={setSearch}
    />

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
            setSelectedBooking(booking as any);
            setIsEditOpen(true);
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