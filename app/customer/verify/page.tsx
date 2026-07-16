"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  const verifyOTP = async () => {
    if (!email) return;

    const { error } = await supabase.auth.verifyOtp({
      email,
      token: otp,
      type: "email",
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    // Find customer
    const { data: customer, error: customerError } = await supabase
      .from("customers")
      .select("*")
      .eq("email", email)
      .single();

    if (customerError || !customer) {
      setMessage("Customer account not found");
      return;
    }

    // Save customer id for dashboard
    localStorage.setItem(
      "customer_id",
      customer.id
    );

    router.push("/customer/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <h1 className="text-2xl font-bold mb-4">
          Verify OTP
        </h1>

        <input
          className="border p-2"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          onClick={verifyOTP}
          className="bg-black text-white p-2 ml-2"
        >
          Verify
        </button>

        <p>{message}</p>
      </div>
    </div>
  );
}