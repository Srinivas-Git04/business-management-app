interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  let styles = "bg-gray-100 text-gray-700";

  switch (status) {
    case "Pending":
      styles = "bg-yellow-100 text-yellow-700";
      break;

    case "Assigned":
      styles = "bg-blue-100 text-blue-700";
      break;

    case "Completed":
      styles = "bg-green-100 text-green-700";
      break;

    case "Cancelled":
      styles = "bg-red-100 text-red-700";
      break;

    case "Available":
      styles = "bg-green-100 text-green-700";
      break;

    case "Busy":
      styles = "bg-red-100 text-red-700";
      break;

    case "Paid":
      styles = "bg-green-100 text-green-700";
      break;
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${styles}`}
    >
      {status}
    </span>
  );
}