"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DriverSidebar() {
  const pathname = usePathname();

  const menu = [
    {
      name: "Dashboard",
      href: "/driver/dashboard",
      icon: "🏠",
    },
    {
      name: "My Rides",
      href: "/driver/rides",
      icon: "🚗",
    },
    {
      name: "History",
      href: "/driver/history",
      icon: "📋",
    },
    {
      name: "Earnings",
      href: "/driver/earnings",
      icon: "💰",
    },
    {
      name: "Profile",
      href: "/driver/profile",
      icon: "👤",
    },
  ];

  return (
    <aside className="w-72 bg-green-700 text-white min-h-screen p-6">

      <h1 className="text-3xl font-bold mb-10">
        🚗 Driver
      </h1>

      <nav className="space-y-2">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block rounded-lg px-4 py-3 transition ${
              pathname === item.href
                ? "bg-white text-green-700 font-semibold"
                : "hover:bg-green-600"
            }`}
          >
            {item.icon} {item.name}
          </Link>
        ))}
      </nav>

    </aside>
  );
}