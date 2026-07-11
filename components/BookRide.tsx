"use client";

import { useState } from "react";

export default function BookRide() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    pickup: "",
    drop: "",
    vehicle: "Sedan",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(form);

    alert("Ride request submitted successfully!");
  };

  return (
    <section id="book" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-10">
          Book a Ride
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 bg-gray-100 p-8 rounded-xl shadow"
        >
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full p-3 rounded border"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="w-full p-3 rounded border"
          />

          <input
            name="pickup"
            placeholder="Pickup Location"
            onChange={handleChange}
            className="w-full p-3 rounded border"
          />

          <input
            name="drop"
            placeholder="Drop Location"
            onChange={handleChange}
            className="w-full p-3 rounded border"
          />

          <select
            name="vehicle"
            onChange={handleChange}
            className="w-full p-3 rounded border"
          >
            <option>Sedan</option>
            <option>SUV</option>
            <option>Mini</option>
          </select>

          <button
            className="bg-blue-600 text-white px-8 py-3 rounded-lg w-full hover:bg-blue-700"
          >
            Book Now
          </button>
        </form>
      </div>
    </section>
  );
}