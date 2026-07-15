"use client";

import { useState } from "react";
import StatusBadge from "./StatusBadge";

interface Driver {
  id: string;
  full_name: string;
  is_available: boolean;
}

interface Booking {
  id: string;
  full_name: string;
  phone: string;
  pickup_location: string;
  destination: string;
  booking_type: string;
  vehicle_type: string;
  price: number;
  status: string;
  assigned_driver: string | null;
}

interface BookingTableProps {
  bookings: Booking[];
  drivers: Driver[];
  onAssign: (bookingId: string, driverId: string) => void;
  onComplete: (booking: Booking) => void;
  onEdit: (booking: Booking) => void;
}

export default function BookingTable({
  bookings,
  drivers,
  onAssign,
  onComplete,
  onEdit,
}: BookingTableProps) {
  const [selectedDrivers, setSelectedDrivers] = useState<
    Record<string, string>
  >({});

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="p-4 text-left">Customer</th>
            <th className="p-4 text-left">Phone</th>
            <th className="p-4 text-left">Pickup</th>
            <th className="p-4 text-left">Destination</th>
            <th className="p-4 text-left">Plan</th>
            <th className="p-4 text-left">Vehicle</th>
            <th className="p-4 text-left">Driver</th>
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Action</th>
            <th className="p-4 text-left">Edit</th>
          </tr>
        </thead>

        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan={11} className="text-center p-6">
                No bookings found.
              </td>
            </tr>
          ) : (
            bookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-4">{booking.full_name}</td>

                <td className="p-4">{booking.phone}</td>

                <td className="p-4">{booking.pickup_location}</td>

                <td className="p-4">{booking.destination}</td>

                <td className="p-4">{booking.booking_type}</td>

                <td className="p-4">{booking.vehicle_type}</td>

                {/* Driver */}
                <td className="p-4">
                  {booking.assigned_driver ? (
                    <span className="text-green-600 font-semibold">
                      {booking.assigned_driver}
                    </span>
                  ) : (
                    <select
                      className="border rounded-lg px-2 py-2 w-full"
                      value={selectedDrivers[booking.id] || ""}
                      onChange={(e) =>
                        setSelectedDrivers({
                          ...selectedDrivers,
                          [booking.id]: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Driver</option>

                      {drivers
                        .filter((driver) => driver.is_available)
                        .map((driver) => (
                          <option
                            key={driver.id}
                            value={driver.id}
                          >
                            {driver.full_name}
                          </option>
                        ))}
                    </select>
                  )}
                </td>

                <td className="p-4 font-semibold">
                  ₹{booking.price}
                </td>

                <td className="p-4">
                  <StatusBadge status={booking.status} />
                </td>

                <td className="p-4">
                  {booking.status === "Completed" ? (
                    <button
                      disabled
                      className="bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      Completed
                    </button>
                  ) : booking.assigned_driver ? (
                    <button
                      onClick={() => onComplete(booking)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                      Complete Ride
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        onAssign(
                          booking.id,
                          selectedDrivers[booking.id]
                        )
                      }
                      disabled={!selectedDrivers[booking.id]}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg"
                    >
                      Assign
                    </button>
                  )}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => {
                      alert("Edit clicked");
                      console.log("Calling parent onEdit...");
                      onEdit(booking);
                    }}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}