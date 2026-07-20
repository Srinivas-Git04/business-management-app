"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Contact() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  const { error } = await supabase
    .from("contact_messages")
    .insert({
      full_name: name,
      phone: phone,
      message: message,
    });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Message sent successfully!");

  setName("");
  setPhone("");
  setMessage("");
}

  return (
    <section
      id="contact"
      className="py-20 px-8 bg-gray-100"
    >
      <div className="max-w-xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
         <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

          <input
            type="phone"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}