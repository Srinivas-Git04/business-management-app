"use client";

import StatusBadge from "./StatusBadge";

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
}

interface BookingTableProps {
  bookings: Booking[];
}

export default function BookingTable({
  bookings,
}: BookingTableProps) {
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
            <th className="p-4 text-left">Price</th>
            <th className="p-4 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center p-6">
                No bookings found.
              </td>
            </tr>
          ) : (
            bookings.map((booking) => (
              <tr key={booking.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{booking.full_name}</td>
                <td className="p-4">{booking.phone}</td>
                <td className="p-4">{booking.pickup_location}</td>
                <td className="p-4">{booking.destination}</td>
                <td className="p-4">{booking.booking_type}</td>
                <td className="p-4">{booking.vehicle_type}</td>
                <td className="p-4 font-semibold">₹{booking.price}</td>
                <td className="p-4">
                  <StatusBadge status={booking.status} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}