"use client";

import StatusBadge from "@/components/admin/StatusBadge";

interface Booking {
  id: string;
  booking_date: string;
  pickup_location: string;
  destination: string;
  price: number;
  status: string;
}

interface Customer {
  full_name: string;
  phone: string;
  email: string;
  bookings: number;
  spent: number;
}

interface Props {
  open: boolean;
  customer: Customer | null;
  bookings: Booking[];
  onClose: () => void;
}

export default function CustomerHistoryModal({
  open,
  customer,
  bookings,
  onClose,
}: Props) {
  if (!open || !customer) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-[700px] max-h-[85vh] overflow-y-auto p-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-bold">
            👤 Customer Details
          </h2>

          <button
            onClick={onClose}
            className="text-red-600 font-bold text-xl"
          >
            ✕
          </button>

        </div>

        <div className="space-y-2 mb-8">

          <p><strong>Name:</strong> {customer.full_name}</p>

          <p><strong>Phone:</strong> {customer.phone}</p>

          <p><strong>Email:</strong> {customer.email}</p>

          <p><strong>Total Bookings:</strong> {customer.bookings}</p>

          <p><strong>Total Spent:</strong> ₹{customer.spent}</p>

        </div>

        <h3 className="text-2xl font-semibold mb-4">
          Booking History
        </h3>

        <table className="w-full border">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3">Date</th>

              <th className="p-3">Pickup</th>

              <th className="p-3">Destination</th>

              <th className="p-3">Fare</th>

              <th className="p-3">Status</th>

            </tr>

          </thead>

          <tbody>

            {bookings.map((booking) => (

              <tr key={booking.id} className="border-t">

                <td className="p-3">{booking.booking_date}</td>

                <td className="p-3">{booking.pickup_location}</td>

                <td className="p-3">{booking.destination}</td>

                <td className="p-3">₹{booking.price}</td>

                <td className="p-3">
                    <StatusBadge status={booking.status} />
                    </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}