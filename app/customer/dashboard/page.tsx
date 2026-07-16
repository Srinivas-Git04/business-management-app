"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function CustomerDashboard() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [customer, setCustomer] = useState<any>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const customerId = localStorage.getItem("customer_id");

      if (!customerId) return;

      // Get customer details
      const { data: customerData } = await supabase
        .from("customers")
        .select("*")
        .eq("id", customerId)
        .single();

      setCustomer(customerData);

      // Get only customer's bookings
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .eq("customer_id", customerId)
        .order("created_at", { ascending: false });

      if (error) {
        console.log(error);
        return;
      }

      setBookings(data || []);
    };

    fetchBookings();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">
        Welcome {customer?.full_name}
      </h1>

      <p className="mt-2">
        Email: {customer?.email}
      </p>

      <h2 className="text-2xl font-semibold mt-8">
        My Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="mt-4">
          No bookings found
        </p>
      ) : (
        <div className="mt-4 space-y-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="border rounded-lg p-4"
            >
              <p>
                📅 Date: {booking.booking_date}
              </p>

              <p>
                📍 Pickup: {booking.pickup_location}
              </p>

              <p>
                🏁 Destination: {booking.destination}
              </p>

              <p>
                🚗 Driver: {booking.assigned_driver || "Not assigned"}
              </p>

              <p>
                Status: {booking.status}
              </p>

              <p>
                Amount: ₹{booking.price}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}