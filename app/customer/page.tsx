"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface Booking {
  id: string;
  pickup_location: string;
  destination: string;
  booking_date: string;
  pickup_time: string;
  booking_type: string;
  vehicle_type: string;
  price: number;
  status: string;
  assigned_driver: string | null;
}

export default function CustomerDashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    // Check login
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user.email) {
      router.push("/login");
      return;
    }

    const email = session.user.email;

    setUserEmail(email);

    // Find customer
    const { data: customer, error: customerError } = await supabase
      .from("customers")
      .select("id")
      .eq("email", email)
      .single();

    if (customerError) {
      setLoading(false);
      alert(customerError.message);
      return;
    }

    // Get only this customer's bookings
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("customer_id", customer.id)
      .order("booking_date", { ascending: false });

    if (error) {
      setLoading(false);
      alert(error.message);
      return;
    }

    setBookings(data || []);
    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">
            Customer Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            {userEmail}
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {bookings.length === 0 ? (
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

              <div className="flex justify-between">

                <div>

                  <h2 className="text-2xl font-bold">
                    {booking.status}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {booking.pickup_location}
                  </p>

                  <p className="text-gray-500">
                    ↓
                  </p>

                  <p className="text-gray-500">
                    {booking.destination}
                  </p>

                </div>

                <div className="text-right">

                  <p className="font-semibold">
                    {booking.booking_date}
                  </p>

                  <p>
                    {booking.pickup_time}
                  </p>

                  <p className="mt-2">
                    {booking.vehicle_type}
                  </p>

                  <p>
                    {booking.booking_type}
                  </p>

                  <p className="text-green-600 font-bold mt-3">
                    ₹{booking.price}
                  </p>

                </div>

              </div>

              {booking.assigned_driver && (
                <div className="mt-5 border-t pt-4">

                  <p className="font-semibold">
                    Driver Assigned
                  </p>

                  <p>
                    {booking.assigned_driver}
                  </p>

                </div>
              )}

            </div>
          ))}

        </div>
      )}

    </div>
  );
}