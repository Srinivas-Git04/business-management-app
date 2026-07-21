"use client";

import BookingChart from "@/components/admin/BookingChart";
import RevenueChart from "@/components/admin/RevenueChart";
import StatusPieChart from "@/components/admin/StatusPieChart";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

import StatCard from "@/components/admin/StatCard";

interface Driver {
  id: string;
  is_available: boolean;
}

interface Booking {
  id: string;
  booking_date: string;
  price: number;
  status: string;
  payment_status: string;
}

export default function AdminDashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user.email) {
      router.replace("/admin/login");
      return;
    }

    const { data: admin } = await supabase
      .from("admins")
      .select("id")
      .eq("email", session.user.email)
      .maybeSingle();

    if (!admin) {
      await supabase.auth.signOut();
      router.replace("/admin/login");
      return;
    }

    await fetchDashboard();

    setLoading(false);
  }

  async function fetchDashboard() {
    const { data: bookingData } = await supabase
      .from("bookings")
      .select("*");

    const { data: driverData } = await supabase
      .from("drivers")
      .select("*");


    setBookings(bookingData || []);
    setDrivers(driverData || []);
  }

  const today = new Date().toISOString().split("T")[0];

  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + booking.price,
    0
  );

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

  const completedRides = bookings.filter(
    (b) => b.status === "Completed"
  ).length;

  const pendingBookings = bookings.filter(
    (b) => b.status === "Pending"
  ).length;

  const assignedBookings = bookings.filter(
    (b) => b.status === "Assigned"
  ).length;

  const cancelledBookings = bookings.filter(
    (b) => b.status === "Cancelled"
  ).length;

  const availableDrivers = drivers.filter(
    (d) => d.is_available
  ).length;

  const busyDrivers = drivers.filter(
    (d) => !d.is_available
  ).length;

  const totalDrivers = drivers.length;
  const bookingChartData = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ].map((day, index) => ({
    day,
    bookings: bookings.filter((booking) => {
      const bookingDay = new Date(booking.booking_date).getDay();
      return bookingDay === index;
    }).length,
  }));

  const revenueChartData = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
].map((day, index) => ({
  day,
  revenue: bookings
    .filter(
      (booking) =>
        new Date(booking.booking_date).getDay() === index
    )
    .reduce(
      (sum, booking) => sum + booking.price,
      0
    ),
}));

const bookingStatusData = [
  {
    name: "Completed",
    value: completedRides,
  },
  {
    name: "Pending",
    value: pendingBookings,
  },
  {
    name: "Assigned",
    value: assignedBookings,
  },
  {
    name: "Cancelled",
    value: cancelledBookings,
  },
];

const driverStatusData = [
  {
    name: "Available",
    value: availableDrivers,
  },
  {
    name: "Busy",
    value: busyDrivers,
  },
];

  if (loading) {
    return (
      <div className="text-center mt-20 text-xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
  <div>
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold">
        🚗 DSK DriveMate Admin Dashboard
      </h1>

      <button
        onClick={async () => {
          await supabase.auth.signOut();
          router.replace("/admin/login");
        }}
        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
      >
        Logout
      </button>
    </div>

    {/* Business Overview */}
    <h2 className="text-2xl font-bold mb-4">
      💰 Business Overview
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
      <StatCard
        title="Total Revenue"
        value={`₹${totalRevenue}`}
        color="text-emerald-600"
      />

      <StatCard
        title="This Month's Revenue"
        value={`₹${monthRevenue}`}
        color="text-indigo-700"
      />

      <StatCard
        title="Today's Revenue"
        value={`₹${todayRevenue}`}
        color="text-blue-700"
      />

      <StatCard
        title="Total Bookings"
        value={bookings.length}
      />
    </div>

    {/* Booking Status */}
    <h2 className="text-2xl font-bold mb-4">
      📋 Booking Status
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
      <StatCard
        title="Pending"
        value={pendingBookings}
        color="text-yellow-600"
      />

      <StatCard
        title="Assigned"
        value={assignedBookings}
        color="text-indigo-600"
      />

      <StatCard
        title="Completed"
        value={completedRides}
        color="text-green-600"
      />

      <StatCard
        title="Cancelled"
        value={cancelledBookings}
        color="text-red-600"
      />
    </div>

    {/* Driver Status */}
    <h2 className="text-2xl font-bold mb-4">
      🚗 Driver Status
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
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
        title="Today's Bookings"
        value={todayBookings}
        color="text-blue-600"
      />
    </div>

    {/* Charts */}
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
      <BookingChart data={bookingChartData} />

      <RevenueChart data={revenueChartData} />
    </div>

    {/* Pie Charts */}
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <StatusPieChart
        title="📋 Booking Status"
        data={bookingStatusData}
      />

      <StatusPieChart
        title="🚗 Driver Availability"
        data={driverStatusData}
      />
    </div>
  </div>
);
}