"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function BookRide() {
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    pickup_location: "",
    destination: "",
    vehicle_type: "Sedan",
    booking_type: "4 Hours",
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

    const { error } = await supabase.from("bookings").insert([
      {
        full_name: form.full_name,
        phone: form.phone,
        pickup_location: form.pickup_location,
        destination: form.destination,
        vehicle_type: form.vehicle_type,
        booking_type: form.booking_type,
        booking_date: form.booking_date,
        pickup_time: form.pickup_time,
        notes: form.notes,
        price: prices[form.booking_type],
      },
    ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Driver booking submitted successfully!");

    setForm({
      full_name: "",
      phone: "",
      pickup_location: "",
      destination: "",
      vehicle_type: "Sedan",
      booking_type: "4 Hours",
      booking_date: "",
      pickup_time: "",
      notes: "",
    });
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
            className="border rounded-lg p-3"
          >
            <option>Sedan</option>
            <option>SUV</option>
            <option>Hatchback</option>
            <option>Luxury</option>
          </select>

          <select
            name="booking_type"
            value={form.booking_type}
            onChange={handleChange}
            className="border rounded-lg p-3"
          >
            <option>4 Hours</option>
            <option>Extra Hours</option>
            <option>12 Hours</option>
            <option>24 Hours</option>
            <option>Outstation</option>
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