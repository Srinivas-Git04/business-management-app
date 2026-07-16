"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Booking {
  id: string;
  full_name: string;
  email: string;
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

export default function CustomerDashboard() {
  const router = useRouter();

  const [userEmail, setUserEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    setUserEmail(user.email || "");

    fetchBookings(user.email!);
  }

  async function fetchBookings(email: string) {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("email", email)
      .order("booking_date", { ascending: false });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setBookings(data || []);

    if (data && data.length > 0) {
      setCustomerName(data[0].full_name);
    }

    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-4xl font-bold">
              Welcome, {customerName || "Customer"} 👋
            </h1>

            <p className="text-gray-500">
              {userEmail}
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg"
          >
            Logout
          </button>

        </div>

        {loading ? (
          <div className="text-center py-10">
            Loading...
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            No bookings found.
          </div>
        ) : (
          <div className="grid gap-6">

            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-xl shadow-lg p-6"
              >

                <div className="flex justify-between mb-4">

                  <h2 className="text-xl font-bold">
                    Booking #{booking.id.slice(0,8)}
                  </h2>

                  <span className="font-semibold text-blue-600">
                    {booking.status}
                  </span>

                </div>

                <div className="grid md:grid-cols-2 gap-3">

                  <p><strong>Pickup:</strong> {booking.pickup_location}</p>

                  <p><strong>Destination:</strong> {booking.destination}</p>

                  <p><strong>Vehicle:</strong> {booking.vehicle_type}</p>

                  <p><strong>Duration:</strong> {booking.booking_type}</p>

                  <p><strong>Date:</strong> {booking.booking_date}</p>

                  <p><strong>Time:</strong> {booking.pickup_time}</p>

                  <p><strong>Price:</strong> ₹{booking.price}</p>

                  <p>
                    <strong>Driver:</strong>{" "}
                    {booking.assigned_driver || "Not Assigned"}
                  </p>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}