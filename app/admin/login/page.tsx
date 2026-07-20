"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  async function handleLogin(e: React.FormEvent) {
  e.preventDefault();

  setLoading(true);

  try {
    const { data: admin, error: adminError } = await supabase
      .from("admins")
      .select("id")
      .eq("email", email.trim().toLowerCase())
      .maybeSingle();

    if (adminError) throw adminError;

    if (!admin) {
      alert("Access denied. You are not an administrator.");
      return;
    }

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
      },
    });

    if (error) throw error;

    alert("Magic link sent! Please check your email.");
  } catch (err: any) {
    console.error(err);
    alert(err.message || "Something went wrong.");
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-blue-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-700">
            Admin Login
          </h1>

          <p className="text-gray-500 mt-2">
            DSK DriveMate Administration
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block mb-2 font-medium">
              Admin Email
            </label>

            <input
              type="email"
              required
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex justify-center pt-2">
            
            <button
              type="submit"
              disabled={loading || cooldown}
              className={`
                px-8 py-3 rounded-lg font-semibold text-white
                transition-all duration-300
                ${
                  loading || cooldown
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 hover:scale-105 shadow-lg"
                }
              `}
            >
              {loading
                ? "Sending..."
                : cooldown
                ? "Please wait..."
                : "Login"}
            </button>
          </div>

        </form>

        <p className="text-center text-gray-500 text-sm mt-6">
          Only registered administrators can access the dashboard.
        </p>

      </div>
    </div>
  );
}