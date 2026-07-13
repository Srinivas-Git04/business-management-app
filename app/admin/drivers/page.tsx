"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Driver {
  id: string;
  full_name: string;
  phone: string;
  license_number: string;
  experience: number;
  is_available: boolean;
}

export default function DriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    license_number: "",
    experience: "",
  });

  async function fetchDrivers() {
    const { data, error } = await supabase
      .from("drivers")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setDrivers(data || []);
    }
  }

  useEffect(() => {
    fetchDrivers();
  }, []);

  async function addDriver(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.from("drivers").insert([
      {
        full_name: form.full_name,
        phone: form.phone,
        license_number: form.license_number,
        experience: Number(form.experience),
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Driver added successfully!");

    setForm({
      full_name: "",
      phone: "",
      license_number: "",
      experience: "",
    });

    fetchDrivers();
  }

  async function toggleAvailability(driver: Driver) {
    await supabase
      .from("drivers")
      .update({
        is_available: !driver.is_available,
      })
      .eq("id", driver.id);

    fetchDrivers();
  }

  async function deleteDriver(id: string) {
    if (!confirm("Delete this driver?")) return;

    await supabase
      .from("drivers")
      .delete()
      .eq("id", id);

    fetchDrivers();
  }

  return (
    <div>

      <h1 className="text-4xl font-bold mb-8">
        🚗 Driver Management
      </h1>

      <form
        onSubmit={addDriver}
        className="bg-white p-6 rounded-xl shadow mb-10 grid md:grid-cols-4 gap-4"
      >
        <input
          placeholder="Driver Name"
          value={form.full_name}
          onChange={(e) =>
            setForm({ ...form, full_name: e.target.value })
          }
          className="border rounded-lg p-3"
          required
        />

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
          className="border rounded-lg p-3"
          required
        />

        <input
          placeholder="License Number"
          value={form.license_number}
          onChange={(e) =>
            setForm({
              ...form,
              license_number: e.target.value,
            })
          }
          className="border rounded-lg p-3"
          required
        />

        <input
          type="number"
          placeholder="Experience (Years)"
          value={form.experience}
          onChange={(e) =>
            setForm({
              ...form,
              experience: e.target.value,
            })
          }
          className="border rounded-lg p-3"
        />

        <button className="bg-blue-600 text-white py-3 rounded-lg md:col-span-4 hover:bg-blue-700">
          Add Driver
        </button>
      </form>

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">

            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">License</th>
              <th className="p-4 text-left">Experience</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {drivers.map((driver) => (
              <tr
                key={driver.id}
                className="border-b"
              >
                <td className="p-4">{driver.full_name}</td>
                <td className="p-4">{driver.phone}</td>
                <td className="p-4">{driver.license_number}</td>
                <td className="p-4">{driver.experience} yrs</td>

                <td className="p-4">
                  <button
                    onClick={() =>
                      toggleAvailability(driver)
                    }
                    className={`px-3 py-1 rounded text-white ${
                      driver.is_available
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {driver.is_available
                      ? "Available"
                      : "Busy"}
                  </button>
                </td>

                <td className="p-4">
                  <button
                    onClick={() =>
                      deleteDriver(driver.id)
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}