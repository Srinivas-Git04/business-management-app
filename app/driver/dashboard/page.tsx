"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {supabase} from "@/lib/supabase";


interface Driver {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  is_available: boolean;
}

interface Booking {
  id: string;
  full_name: string;
  phone: string;
  pickup_location: string;
  destination: string;
  pickup_time: string;
  vehicle_type: string;
  price: number;
  status: string;
  driver_id: string;
}

export default function DriverDashboard() {
  const router = useRouter();
  const [driver, setDriver] = useState<Driver | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [todaysTrips, setTodaysTrips] = useState(0);
  const [completedTrips, setCompletedTrips] = useState(0);
  const [todaysEarnings, setTodaysEarnings] = useState(0);

  useEffect(() => {
  checkDriver();
}, []);

async function checkDriver() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user.email) {
    router.replace("/driver/login");
    return;
  }

  const { data, error } = await supabase
    .from("drivers")
    .select("*")
    .eq("email", session.user.email)
    .maybeSingle();

  if (error || !data) {
    await supabase.auth.signOut();
    router.replace("/driver/login");
    return;
  }

  setDriver(data as Driver);
  await fetchAssignedBooking(data.id);
  await fetchDriverStats(data.id);
}

async function fetchAssignedBooking(driverId: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("driver_id", driverId)
    .in("status", ["Assigned", "Started"])
    .maybeSingle();

  if (error) {
    console.error(error.message);
    return;
  }

  setBooking(data as Booking);
}

async function fetchDriverStats(driverId: string) {
  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("driver_id", driverId);

  if (error) {
    console.error(error.message);
    return;
  }

  const bookings = data || [];

  setTodaysTrips(
    bookings.filter(
      (b) =>
        b.booking_date === today &&
        b.status === "Completed"
    ).length
  );

  setCompletedTrips(
    bookings.filter(
      (b) => b.status === "Completed"
    ).length
  );

  setTodaysEarnings(
    bookings
      .filter(
        (b) =>
          b.booking_date === today &&
          b.status === "Completed"
      )
      .reduce((sum, b) => sum + b.price, 0)
  );
}

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-green-700">
          🚗 Welcome, {driver?.full_name ?? "Driver"}
        </h1>

        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.replace("/driver/login");
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Today's Trips</p>
          <h2 className="text-3xl font-bold mt-2">
            {todaysTrips}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Completed</p>
          <h2 className="text-3xl font-bold mt-2">
            {completedTrips}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Today's Earnings</p>
          <h2 className="text-3xl font-bold mt-2">
            ₹{todaysEarnings}</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Status
          </p>

          <button
            onClick={() => setAvailable(!available)}
            className={`mt-3 px-4 py-2 rounded-lg text-white ${
              driver?.is_available
                ? "bg-green-600"
                : "bg-red-600"
            }`}
          >
            {driver?.is_available ? "Available" : "Busy"}
          </button>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-6">
          Assigned Ride
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <div>
            <p>
              <strong>Customer:</strong> {booking?.full_name ?? "-"}
            </p>

            <p>
              <strong>Phone:</strong> {booking?.phone ?? "-"}
            </p>

            <p>
              <strong>Pickup:</strong> {booking?.pickup_location ?? "-"}
            </p>

            <p>
              <strong>Destination:</strong> {booking?.destination ?? "-"}
            </p>
          </div>

          <div>
            <p>
              <strong>Booking Time:</strong> {booking?.pickup_time ?? "-"}
            </p>

            <p>
              <strong>Vehicle:</strong> {booking?.vehicle_type ?? "-"}
            </p>

            <p>
              <strong>Fare:</strong> ₹{booking?.price?.toLocaleString() ?? "0"}
            </p>

            <p>
              <strong>Status:</strong> {booking?.status ?? "No Ride Assigned"}
            </p>
          </div>

        </div>

        <div className="mt-8 flex gap-4">

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
            Accept Ride
          </button>

          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg">
            Start Ride
          </button>

          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg">
            Complete Ride
          </button>

        </div>

      </div>

    </div>
  );
}