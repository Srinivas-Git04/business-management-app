"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface ChartData {
  day: string;
  revenue: number;
}

interface Props {
  data: ChartData[];
}

export default function RevenueChart({
  data,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-6">
        💰 Revenue Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#16a34a"
            fill="#86efac"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}