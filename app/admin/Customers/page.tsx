"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Customer {
  full_name: string;
  phone: string;
  email: string;
  bookings: number;
  spent: number;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    setLoading(true);

    const { data, error } = await supabase
      .from("bookings")
      .select("*");

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    const customerMap = new Map<string, Customer>();

    data?.forEach((booking) => {
      const key = booking.phone;

      if (!customerMap.has(key)) {
        customerMap.set(key, {
          full_name: booking.full_name,
          phone: booking.phone,
          email: booking.email || "-",
          bookings: 1,
          spent: booking.price,
        });
      } else {
        const customer = customerMap.get(key)!;

        customer.bookings += 1;
        customer.spent += booking.price;
      }
    });

    setCustomers(Array.from(customerMap.values()));
    setLoading(false);
  }

  const filteredCustomers = customers.filter(
  (customer) =>
    customer.full_name
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    customer.phone.includes(search)
);

const totalCustomers = customers.length;

const totalRevenue = customers.reduce(
  (sum, c) => sum + c.spent,
  0
);

const totalBookings = customers.reduce(
  (sum, c) => sum + c.bookings,
  0
);

const averageSpent =
  totalCustomers > 0
    ? Math.round(totalRevenue / totalCustomers)
    : 0;

  return (
    <div className="p-6">

      <h1 className="text-4xl font-bold mb-8">
        👥 Customers
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Customers</p>
          <h2 className="text-3xl font-bold">
            {totalCustomers}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Bookings</p>
          <h2 className="text-3xl font-bold">
            {totalBookings}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Revenue</p>
          <h2 className="text-3xl font-bold text-green-600">
            ₹{totalRevenue}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">Average Spent</p>
          <h2 className="text-3xl font-bold text-blue-600">
            ₹{averageSpent}
          </h2>
        </div>

      </div>

      <input
        type="text"
        placeholder="Search customer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-lg px-4 py-2 w-full mb-6"
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-4 text-left">Name</th>

                <th className="p-4 text-left">Phone</th>

                <th className="p-4 text-left">Email</th>

                <th className="p-4 text-center">
                  Bookings
                </th>

                <th className="p-4 text-center">
                  Total Spent
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredCustomers.map((customer) => (

                <tr
                  key={customer.phone}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4">
                    {customer.full_name}
                  </td>

                  <td className="p-4">
                    {customer.phone}
                  </td>

                  <td className="p-4">
                    {customer.email}
                  </td>

                  <td className="p-4 text-center">
                    {customer.bookings}
                  </td>

                  <td className="p-4 text-center font-semibold text-green-600">
                    ₹{customer.spent}
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