"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [settingsId, setSettingsId] = useState("");

  const [form, setForm] = useState({
    business_name: "",
    business_phone: "",
    business_email: "",
    business_address: "",
    price_4_hours: 0,
    price_8_hours: 0,
    price_12_hours: 0,
    price_24_hours: 0,
    extra_hour_price: 0,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .limit(1);

  if (error) {
    alert(error.message);
    return;
  }

  if (!data || data.length === 0) {
    alert("No settings found.");
    return;
  }

  const settings = data[0];

  setSettingsId(settings.id);

  setForm({
    business_name: settings.business_name,
    business_phone: settings.business_phone,
    business_email: settings.business_email,
    business_address: settings.business_address,
    price_4_hours: settings.price_4_hours,
    price_8_hours: settings.price_8_hours,
    price_12_hours: settings.price_12_hours,
    price_24_hours: settings.price_24_hours,
    extra_hour_price: settings.extra_hour_price,
  });

  setLoading(false);
}

  async function saveSettings() {
    setSaving(true);

    const { error } = await supabase
      .from("settings")
      .update(form)
      .eq("id", settingsId);

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Settings updated successfully!");
  }

  if (loading) {
    return (
      <div className="text-center text-xl mt-20">
        Loading Settings...
      </div>
    );
  }

  return (
    <div className="space-y-10">

      <h1 className="text-4xl font-bold">
        ⚙️ Settings
      </h1>

      {/* Business Information */}
      <div className="bg-white rounded-xl shadow p-8">

        <h2 className="text-2xl font-bold mb-6">
          Business Information
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="space-y-3">
            <label className="block text-lg font-semibold text-gray-700">
              Business Name
            </label>
            

          <input
            className="w-full border rounded-lg p-3 disabled:bg-gray-100"
            disabled={!isEditing}
            placeholder="Business Name"
            value={form.business_name}
            onChange={(e) =>
              setForm({
                ...form,
                business_name: e.target.value,
              })
            }
          />
          </div>

          <div className="space-y-3">
            <label className="block text-lg font-semibold text-gray-700">
              Phone
            </label>
            

          <input
            className="w-full border rounded-lg p-3 disabled:bg-gray-100"
            disabled={!isEditing}
            placeholder="Phone"
            value={form.business_phone}
            onChange={(e) =>
              setForm({
                ...form,
                business_phone: e.target.value,
              })
            }
          />
          </div>

          <div className="space-y-3">
            <label className="block text-lg font-semibold text-gray-700">
              Email
            </label>
            

          <input
            className="w-full border rounded-lg p-3 disabled:bg-gray-100"
            disabled={!isEditing}
            placeholder="Email"
            value={form.business_email}
            onChange={(e) =>
              setForm({
                ...form,
                business_email: e.target.value,
              })
            }
          />
          </div>

          <div className="space-y-3">
            <label className="block text-lg font-semibold text-gray-700">
              Address
            </label>
          

          <input
            className="w-full border rounded-lg p-3 disabled:bg-gray-100"
            disabled={!isEditing}
            placeholder="Address"
            value={form.business_address}
            onChange={(e) =>
              setForm({
                ...form,
                business_address: e.target.value,
              })
            }
          />
          </div>

        </div>
      </div>

      {/* Pricing */}

      <div className="bg-white rounded-xl shadow p-8">

        <h2 className="text-2xl font-bold mb-6">
          Pricing Settings
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="space-y-3">
            <label className="block text-lg font-semibold text-gray-700">
              4 Hours Price
            </label>  

          <input
            type="number"
            className="w-full border rounded-lg p-3 disabled:bg-gray-100"
            disabled={!isEditing}
            placeholder="4 Hours"
            value={form.price_4_hours}
            onChange={(e)=>
              setForm({
                ...form,
                price_4_hours:Number(e.target.value),
              })
            }
          />
          </div>

          <div className="space-y-3">
            <label className="block text-lg font-semibold text-gray-700">
              8 Hours Price
            </label>  

          <input
            type="number"
            className="w-full border rounded-lg p-3 disabled:bg-gray-100"
            disabled={!isEditing}
            placeholder="8 Hours"
            value={form.price_8_hours}
            onChange={(e)=>
              setForm({
                ...form,
                price_8_hours:Number(e.target.value),
              })
            }
          /> 
          </div>
          
        <div className="space-y-3">
          <label className="block text-lg font-semibold text-gray-700">
            12 Hours Price
          </label>
          

          <input
            type="number"
            className="w-full border rounded-lg p-3 disabled:bg-gray-100"
            disabled={!isEditing}
            placeholder="12 Hours"
            value={form.price_12_hours}
            onChange={(e)=>
              setForm({
                ...form,
                price_12_hours:Number(e.target.value),
              })
            }
          />
          </div>

          <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-700">
              24 Hours Price
            </label>
            

          <input
            type="number"
            className="w-full border rounded-lg p-3 disabled:bg-gray-100"
            disabled={!isEditing}
            placeholder="24 Hours"
            value={form.price_24_hours}
            onChange={(e)=>
              setForm({
                ...form,
                price_24_hours:Number(e.target.value),
              })
            }
          />
          </div>

        <div className="space-y-3">
          <label className="block text-lg font-semibold text-gray-700">
            Extra Hours Price
          </label>
            

          <input
            type="number"
            className="w-full border rounded-lg p-3 disabled:bg-gray-100"
            disabled={!isEditing}
            placeholder="Extra Hour Price"
            value={form.extra_hour_price}
            onChange={(e)=>
              setForm({
                ...form,
                extra_hour_price:Number(e.target.value),
              })
            }
          />
          </div>

        </div>

      </div>

      <div className="flex gap-4">

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
          >
            ✏️ Edit Settings
          </button>
        ) : (
          <>
            <button
              onClick={async () => {
                await saveSettings();
                setIsEditing(false);
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
            >
              💾 Save Changes
            </button>

            <button
              onClick={() => {
                setIsEditing(false);
                fetchSettings();
              }}
              className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg"
            >
              Cancel
            </button>
          </>
        )}

      </div>

    </div>
  );
}