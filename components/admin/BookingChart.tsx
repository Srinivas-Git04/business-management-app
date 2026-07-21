"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface Props {
  data: {
    day: string;
    bookings: number;
  }[];
}

export default function BookingChart({
  data,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Booking Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <Tooltip />

          <Bar
            dataKey="bookings"
            radius={[8,8,0,0]}
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}