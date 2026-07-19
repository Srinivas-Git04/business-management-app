"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
  e.preventDefault();

  setLoading(true);

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/customer`,
    },
  });

  setLoading(false);

  if (error) {
    alert(error.message);
    return;
  }

  alert(
    "We've sent a login link to your email. Open it and you'll be signed in automatically."
  );
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Customer Login
        </h1>

        <input
          type="email"
          placeholder="Email Address"
          className="w-full border rounded-lg p-3 mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          {loading ? "Sending..." : "Send Login Link"}
        </button>
      </form>
    </div>
  );
}