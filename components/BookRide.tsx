"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function BookRide() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    pickup_location: "",
    destination: "",
    vehicle_type: "",
    booking_type: "",
    booking_date: "",
    pickup_time: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const prices: Record<string, number> = {
    "4 Hours": 599,
    "Extra Hours": 100,
    "12 Hours": 1500,
    "24 Hours": 2500,
    "Outstation": 0,
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setLoading(true);

  try {
    // Check if customer already exists
    let { data: customer, error: fetchError } = await supabase
      .from("customers")
      .select("id")
      .eq("email", form.email)
      .maybeSingle();

    if (fetchError) throw fetchError;

    // Create customer if not found
    if (!customer) {
      const { data: newCustomer, error: createError } = await supabase
        .from("customers")
        .insert({
          full_name: form.full_name,
          email: form.email,
          phone: form.phone,
        })
        .select("id")
        .single();

      if (createError) throw createError;

      customer = newCustomer;
    }

    // Create booking
    const { error: bookingError } = await supabase
      .from("bookings")
      .insert({
        customer_id: customer.id,
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        pickup_location: form.pickup_location,
        destination: form.destination,
        vehicle_type: form.vehicle_type,
        booking_type: form.booking_type,
        booking_date: form.booking_date,
        pickup_time: form.pickup_time,
        notes: form.notes,
        price:
          form.booking_type === "Outstation"
            ? 0
            : prices[form.booking_type],
        status: "Pending",
      });

    if (bookingError) throw bookingError;

    alert("Driver booking submitted successfully!");

    setForm({
      full_name: "",
      email: "",
      phone: "",
      pickup_location: "",
      destination: "",
      vehicle_type: "",
      booking_type: "",
      booking_date: "",
      pickup_time: "",
      notes: "",
    });
  } catch (error: any) {
    alert(error.message);
  } finally {
    setLoading(false);
  }
};
  return (
    <section id="book" className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-3">
          Hire a Professional Driver
        </h2>

        <p className="text-center text-gray-600 mb-10">
          Safe • Verified • Experienced Drivers
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 grid md:grid-cols-2 gap-6"
        >

          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={form.full_name}
            onChange={handleChange}
            required
            className="border rounded-lg p-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="border rounded-lg p-3"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            name="pickup_location"
            placeholder="Pickup Location"
            value={form.pickup_location}
            onChange={handleChange}
            required
            className="border rounded-lg p-3"
          />

          <input
            type="text"
            name="destination"
            placeholder="Destination"
            value={form.destination}
            onChange={handleChange}
            required
            className="border rounded-lg p-3"
          />

          <select
            name="vehicle_type"
            value={form.vehicle_type}
            onChange={handleChange}
            required
            className="border rounded-lg p-3"
          >
            <option value="">Select Vehicle Type</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Luxury">Luxury</option>
          </select>

          <select
            name="booking_type"
            value={form.booking_type}
            onChange={handleChange}
            required
            className="border rounded-lg p-3"
          >
            <option value="">Select Duration</option>
            <option value="4 Hours">4 Hours</option>
            <option value="Extra Hours">Extra Hours</option>
            <option value="12 Hours">12 Hours</option>
            <option value="24 Hours">24 Hours</option>
            <option value="Outstation">Outstation</option>
          </select>

          <input
            type="date"
            name="booking_date"
            value={form.booking_date}
            onChange={handleChange}
            required
            className="border rounded-lg p-3"
          />

          <input
            type="time"
            name="pickup_time"
            value={form.pickup_time}
            onChange={handleChange}
            required
            className="border rounded-lg p-3"
          />

          <textarea
            name="notes"
            placeholder="Additional Notes"
            value={form.notes}
            onChange={handleChange}
            rows={4}
            className="border rounded-lg p-3 md:col-span-2"
          />

          <div className="md:col-span-2 bg-blue-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              Estimated Price
            </h3>

            <p className="text-3xl font-bold text-blue-700">
              {form.booking_type === "Outstation"
                ? "Custom Quote"
                : `₹${prices[form.booking_type]}`}
            </p>

            <p className="text-gray-600 mt-2">
              Minimum booking is 4 hours. Extra hours are charged at ₹100/hour.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Request Driver"}
          </button>

        </form>
      </div>
    </section>
  );
}