"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";



export default function Pricing() {
  const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
      loadSettings();
    }, []);

    async function loadSettings() {
      const { data } = await supabase
        .from("settings")
        .select("*")
        .single();

      setSettings(data);
    }

  const plans = [
  {
    title: "Minimum Booking",
    price: `₹${settings?.price_4_hours ?? 599}`,
    duration: "4 Hours",
    features: [
      "Minimum booking is 4 hours",
      "Verified Professional Driver",
      "Customer's Own Vehicle",
      "24×7 Customer Support",
    ],
    featured: true,
  },
  {
    title: "Extended Time",
    price: `₹${settings?.extra_hour_price ?? 100}`,
    duration: "Per Extra Hour",
    features: [
      "After first 4 hours",
      "Flexible extension",
      "No hidden charges",
      "Pay only for extra hours",
    ],
  },
  {
    title: "12 Hours",
    price: `₹${settings?.price_12_hours ?? 1500}`,
    duration: "Full Day",
    features: [
      "Up to 12 hours",
      "Experienced Driver",
      "Waiting Included",
      "Priority Support",
    ],
  },
  {
    title: "24 Hours",
    price: `₹${settings?.price_24_hours ?? 2500}`,
    duration: "One Day",
    features: [
      "Up to 24 hours",
      "Ideal for long trips",
      "Dedicated Driver",
      "24×7 Support",
    ],
  },
];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">
          Pricing Plans
        </h2>

        <p className="text-center text-gray-600 mb-12">
          Transparent pricing with a minimum booking of{" "}
          <span className="font-semibold text-blue-600">4 hours</span>.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`rounded-2xl p-8 shadow-lg transition hover:-translate-y-2 ${
                plan.featured
                  ? "bg-blue-600 text-white"
                  : "bg-white"
              }`}
            >
              <h3 className="text-2xl font-bold">{plan.title}</h3>

              <div className="mt-5">
                <span className="text-5xl font-bold">{plan.price}</span>
                <p className="mt-2">{plan.duration}</p>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check size={18} />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`mt-8 w-full py-3 rounded-lg font-semibold ${
                  plan.featured
                    ? "bg-white text-blue-600"
                    : "bg-blue-600 text-white"
                }`}
              >
                Hire Driver
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}