"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function DriverNavbar() {
  const router = useRouter();

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/driver/login");
  }

  return (
    <header className="bg-white shadow flex justify-between items-center px-8 py-4">

      <h2 className="text-2xl font-bold">
        Driver Portal
      </h2>

      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
      >
        Logout
      </button>

    </header>
  );
}