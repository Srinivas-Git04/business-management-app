"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function DriverLoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      // Check if driver exists
      const { data: driver, error: driverError } = await supabase
        .from("drivers")
        .select("id")
        .eq("email", email.trim().toLowerCase())
        .maybeSingle();

      if (driverError) throw driverError;

      if (!driver) {
        alert("Driver not found.");
        setLoading(false);
        return;
      }

      // Send magic link
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim().toLowerCase(),
        options: {
          emailRedirectTo: `${window.location.origin}/driver`,
        },
      });

      if (error) throw error;

      alert("Magic link sent! Check your email.");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-700">
            Driver Login
          </h1>

          <p className="text-gray-500 mt-2">
            DSK DriveMate Driver Portal
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          <input
            type="email"
            required
            placeholder="Driver Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
          >
            {loading ? "Sending..." : "Login"}
          </button>

        </form>

      </div>
    </div>
  );
}