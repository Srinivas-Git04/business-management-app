"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import CustomerHistoryModal from "@/components/admin/CustomerHistoryModal";
import StatCard from "@/components/admin/StatCard";

interface Customer {
  full_name: string;
  phone: string;
  email: string;
  bookings: number;
  spent: number;
}

interface BookingHistory {
  id: string;
  booking_date: string;
  pickup_location: string;
  destination: string;
  price: number;
  status: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] =
          useState<Customer | null>(null);
  const [history, setHistory] = 
          useState< BookingHistory[]>([]);
  const [openModal, setOpenModal] = useState(false);

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

  async function fetchCustomerHistory(phone: string) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("phone", phone)
    .order("booking_date", { ascending: false });

  if (error) {
    alert(error.message);
    return;
  }

  setHistory(data || []);
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

        

          <StatCard
            title="Total Customers"
            value={totalCustomers}
          />

          <StatCard
            title="Total Bookings"
            value={totalBookings}
            color="text-blue-600"
          />

          <StatCard
            title="Revenue"
            value={`₹${totalRevenue}`}
            color="text-green-600"
          />

          <StatCard
            title="Average Spent"
            value={`₹${averageSpent}`}
            color="text-purple-600"
          />

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

                <th className="p-4 text-center">
                  Actions
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

                  <td className="p-4 text-center">
                    <button
                      onClick={async () => {
                        setSelectedCustomer(customer);
                        await fetchCustomerHistory(customer.phone);
                        setOpenModal(true);
                      }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                      View Bookings
                    </button>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

      <CustomerHistoryModal
        open={openModal}
        customer={selectedCustomer}
        bookings={history}
        onClose={() => setOpenModal(false)}
      />

    </div>
  );
}