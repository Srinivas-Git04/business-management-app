interface StatCardProps {
  title: string;
  value: string | number;
  color?: string;
}

export default function StatCard({
  title,
  value,
  color = "text-blue-600",
}: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6 border hover:shadow-lg transition">
      <p className="text-gray-500 text-sm">{title}</p>

      <h2 className={`text-4xl font-bold mt-2 ${color}`}>
        {value}
      </h2>
    </div>
  );
}