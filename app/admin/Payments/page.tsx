"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import StatCard from "@/components/admin/StatCard";
import SearchBar from "@/components/admin/SearchBar";
import StatusBadge from "@/components/admin/StatusBadge";

interface Payment {
  id: string;
  full_name: string;
  phone: string;
  assigned_driver: string | null;
  price: number;
  status: string;
  payment_status: string;
  booking_date: string;
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPayments();
  }, []);

  async function fetchPayments() {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("status", "Completed")
      .order("booking_date", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setPayments(data || []);
    setLoading(false);
  }

  async function markPaid(id: string) {
    const { error } = await supabase
      .from("bookings")
      .update({
        payment_status: "Paid",
      })
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchPayments();
  }

  const filtered = payments.filter(
    (p) =>
      p.full_name.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search)
  );

  const totalRevenue = payments
    .filter((p) => p.payment_status === "Paid")
    .reduce((sum, p) => sum + p.price, 0);

  const paidCount = payments.filter(
    (p) => p.payment_status === "Paid"
  ).length;

  const pendingCount = payments.filter(
    (p) => p.payment_status !== "Paid"
  ).length;

  return (
    <div>

      <h1 className="text-4xl font-bold mb-8">
        💳 Payments
      </h1>

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <StatCard
          title="Revenue"
          value={`₹${totalRevenue}`}
          color="text-green-600"
        />

        <StatCard
          title="Paid"
          value={paidCount}
          color="text-blue-600"
        />

        <StatCard
          title="Pending"
          value={pendingCount}
          color="text-yellow-600"
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

            <thead className="bg-blue-600 text-white">

              <tr>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">Driver</th>
                <th className="p-4 text-left">Fare</th>
                <th className="p-4 text-left">Payment</th>
                <th className="p-4 text-left">Action</th>
              </tr>

            </thead>

            <tbody>

              {filtered.map((payment) => (

                <tr
                  key={payment.id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4">
                    {payment.full_name}
                  </td>

                  <td className="p-4">
                    {payment.phone}
                  </td>

                  <td className="p-4">
                    {payment.assigned_driver ?? "-"}
                  </td>

                  <td className="p-4 font-bold">
                    ₹{payment.price}
                  </td>

                  <td className="p-4">
                    <StatusBadge
                      status={payment.payment_status}
                    />
                  </td>

                  <td className="p-4">

                    {payment.payment_status === "Paid" ? (

                      <button
                        disabled
                        className="bg-green-600 text-white px-4 py-2 rounded-lg"
                      >
                        Paid
                      </button>

                    ) : (

                      <button
                        onClick={() => markPaid(payment.id)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                      >
                        Mark Paid
                      </button>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}