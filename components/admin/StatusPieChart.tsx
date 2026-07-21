"use client";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

interface Props {
  title: string;
  data: {
    name: string;
    value: number;
  }[];
}

const COLORS = [
  "#22c55e",
  "#eab308",
  "#3b82f6",
  "#ef4444",
];

export default function StatusPieChart({
  title,
  data,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-xl transition-all duration-300 p-6">
      <h2 className="text-2xl font-bold mb-6">
        {title}
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <PieChart>
          <Pie
            cy="45%"
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={
                  COLORS[index % COLORS.length]
                }
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend
            verticalAlign="bottom"
            align="center"
            layout="horizontal"
            iconType="circle"
            iconSize={12}
            wrapperStyle={{
                paddingTop: "20px",
                fontSize: "14px",
                display: "flex",
                justifyContent: "center",
            }}
            />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}