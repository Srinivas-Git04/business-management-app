"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface ContactMessage {
  id: string;
  full_name: string;
  phone: string;
  message: string;
  created_at: string;
}

export default function ContactPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    setLoading(true);

    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert(error.message);
      return;
    }

    setMessages(data || []);
    setLoading(false);
  }

  async function deleteMessage(id: string) {
    if (!confirm("Delete this message?")) return;

    const { error } = await supabase
      .from("contact_messages")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    fetchMessages();
  }

  return (
    <div>

      <h1 className="text-4xl font-bold mb-8">
        📩 Contact Messages
      </h1>

      {loading ? (
        <div className="bg-white rounded-xl shadow p-8 text-center">
          Loading...
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">

          <table className="w-full">

            <thead className="bg-blue-600 text-white">

              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">Message</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-center">Action</th>
              </tr>

            </thead>

            <tbody>

              {messages.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center p-8"
                  >
                    No messages found.
                  </td>
                </tr>
              ) : (
                messages.map((msg) => (

                  <tr
                    key={msg.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-4">
                      {msg.full_name}
                    </td>

                    <td className="p-4">
                      {msg.phone}
                    </td>

                    <td className="p-4 max-w-md">
                      {msg.message}
                    </td>

                    <td className="p-4">
                      {new Date(msg.created_at).toLocaleString()}
                    </td>

                    <td className="p-4 text-center">
                      <button
                        onClick={() => deleteMessage(msg.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>

                ))
              )}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}