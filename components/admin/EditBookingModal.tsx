"use client";

import { useEffect, useState } from "react";

interface Booking {
  id: string;
  full_name: string;
  phone: string;
  pickup_location: string;
  destination: string;
  booking_type: string;
  vehicle_type: string;
  price: number;
}

interface EditBookingModalProps {
  booking: Booking | null;
  open: boolean;
  onClose: () => void;
  onSave: (booking: Booking) => void;
}

export default function EditBookingModal({
  booking,
  open,
  onClose,
  onSave,
}: EditBookingModalProps) {
  const [form, setForm] = useState<Booking | null>(null);

  useEffect(() => {
    if (booking) {
      setForm(booking);
    }
    else {
      setForm(null);
    }
  }, [booking]);

  if (!open || !form) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">

        <h2 className="text-2xl font-bold mb-6">
          Edit Booking
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            className="border p-3 rounded"
            placeholder="Customer Name"
            value={form.full_name}
            onChange={(e) =>
              setForm({
                ...form,
                full_name: e.target.value,
              })
            }
          />

          <input
            className="border p-3 rounded"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
          />

          <input
            className="border p-3 rounded"
            placeholder="Pickup"
            value={form.pickup_location}
            onChange={(e) =>
              setForm({
                ...form,
                pickup_location: e.target.value,
              })
            }
          />

          <input
            className="border p-3 rounded"
            placeholder="Destination"
            value={form.destination}
            onChange={(e) =>
              setForm({
                ...form,
                destination: e.target.value,
              })
            }
          />

          <input
            className="border p-3 rounded"
            placeholder="Booking Type"
            value={form.booking_type}
            onChange={(e) =>
              setForm({
                ...form,
                booking_type: e.target.value,
              })
            }
          />

          <input
            className="border p-3 rounded"
            placeholder="Vehicle"
            value={form.vehicle_type}
            onChange={(e) =>
              setForm({
                ...form,
                vehicle_type: e.target.value,
              })
            }
          />

          <input
            type="number"
            min="0"
            className="border p-3 rounded"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({
                ...form,
                price: Number(e.target.value),
              })
            }
          />

        </div>

        <div className="flex justify-end gap-4 mt-6">

          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-300 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              if (!form) return;
              onSave(form);
            }}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg"
          >
            Save Changes
          </button>

        </div>

      </div>
    </div>
  );
}