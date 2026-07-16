"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function CustomerLogin() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const sendOTP = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("OTP sent to your email");
      router.push(`/customer/verify?email=${email}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <h1 className="text-2xl font-bold mb-4">
          Customer Login
        </h1>

        <input
          className="border p-2"
          placeholder="Enter email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <button
          onClick={sendOTP}
          className="bg-black text-white p-2 ml-2"
        >
          Send OTP
        </button>

        <p>{message}</p>
      </div>
    </div>
  );
}