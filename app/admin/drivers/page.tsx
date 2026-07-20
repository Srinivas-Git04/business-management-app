"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import StatCard from "@/components/admin/StatCard";
import SearchBar from "@/components/admin/SearchBar";
import StatusBadge from "@/components/admin/StatusBadge";
import DriverProfileModal from "@/components/admin/DriverProfileModal";

interface Driver {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  is_available: boolean;
}

export default function DriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [driverRides, setDriverRides] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  

  useEffect(() => {
    fetchDrivers();
  }, []);

  async function fetchDrivers() {
    setLoading(true);

    const { data, error } = await supabase
      .from("drivers")
      .select("*")
      .order("full_name");

    if (error) {
      alert(error.message);
      return;
    }

    setDrivers(data || []);
    setLoading(false);
  }

 async function viewDriver(driver: Driver) {
  setSelectedDriver(driver);

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("driver_id", driver.id)
    .order("booking_date", { ascending: false });

  if (error) {
    alert(error.message);
    return;
  }

  setDriverRides(data || []);
  setOpen(true);
}

async function toggleAvailability(driver: Driver) {
  const { error } = await supabase
    .from("drivers")
    .update({
      is_available: !driver.is_available,
    })
    .eq("id", driver.id);

  if (error) {
    alert(error.message);
    return;
  }

  fetchDrivers();
}

  const filteredDrivers = drivers.filter(
    (driver) =>
      driver.full_name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      driver.phone.includes(search)
  );

  const totalDrivers = drivers.length;

  const availableDrivers = drivers.filter(
    (driver) => driver.is_available
  ).length;

  const busyDrivers = drivers.filter(
    (driver) => !driver.is_available
  ).length;

  return (
    <div>

      <h1 className="text-4xl font-bold mb-8">
        🚗 Drivers
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <StatCard
          title="Total Drivers"
          value={totalDrivers}
        />

        <StatCard
          title="Available"
          value={availableDrivers}
          color="text-green-600"
        />

        <StatCard
          title="Busy"
          value={busyDrivers}
          color="text-red-600"
        />

      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
      />

      {loading ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          Loading...
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Phone
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-center">
                  Status
                </th>

                <th className="p-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredDrivers.map((driver) => (

                <tr
                  key={driver.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4">
                    {driver.full_name}
                  </td>

                  <td className="p-4">
                    {driver.phone}
                  </td>

                  <td className="p-4">
                    {driver.email}
                  </td>

                  <td className="p-4 text-center">

                    <button
                      onClick={() => toggleAvailability(driver)}
                    >
                      <StatusBadge
                        status={
                          driver.is_available
                            ? "Available"
                            : "Busy"
                        }
                      />
                    </button>

                  </td>

                  <td className="p-4 text-center">

                    <button
                      onClick={() => viewDriver(driver)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      View
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

      <DriverProfileModal
        open={open}
        driver={selectedDriver}
        rides={driverRides}
        onClose={() => setOpen(false)}
      />

    </div>
  );
}