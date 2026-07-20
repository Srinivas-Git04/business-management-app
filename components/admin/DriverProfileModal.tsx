import StatusBadge from "./StatusBadge";

interface Driver {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  is_available: boolean;
}

interface Ride {
  id: string;
  booking_date: string;
  pickup_location: string;
  destination: string;
  price: number;
  status: string;
}

interface Props {
  open: boolean;
  driver: Driver | null;
  rides: Ride[];
  onClose: () => void;
}


export default function DriverProfileModal({
  open,
  driver,
  rides,
  onClose,
}: Props) {
  if (!open || !driver) return null;

  const totalEarnings = rides.reduce(
    (sum, ride) =>
      ride.status === "Completed"
        ? sum + ride.price
        : sum,
    0
  );

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-bold">
            🚗 Driver Profile
          </h2>

          <button
            onClick={onClose}
            className="text-red-500 text-xl"
          >
            ✕
          </button>

        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">

          <div>
            <p><strong>Name:</strong> {driver.full_name}</p>
            <p><strong>Phone:</strong> {driver.phone}</p>
            <p><strong>Email:</strong> {driver.email}</p>
          </div>

          <div>
            <p>
              <strong>Status:</strong>{" "}
              <StatusBadge
                status={
                  driver.is_available
                    ? "Available"
                    : "Busy"
                }
              />
            </p>

            <p className="mt-3">
              <strong>Total Trips:</strong>{" "}
              {rides.length}
            </p>

            <p>
              <strong>Total Earnings:</strong>{" "}
              ₹{totalEarnings}
            </p>
          </div>

        </div>

        <h3 className="text-xl font-bold mb-4">
          Ride History
        </h3>

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Pickup</th>
              <th className="p-3 text-left">Destination</th>
              <th className="p-3 text-left">Fare</th>
              <th className="p-3 text-left">Status</th>
            </tr>

          </thead>

          <tbody>

            {rides.map((ride) => (

              <tr
                key={ride.id}
                className="border-t"
              >
                <td className="p-3">
                  {ride.booking_date}
                </td>

                <td className="p-3">
                  {ride.pickup_location}
                </td>

                <td className="p-3">
                  {ride.destination}
                </td>

                <td className="p-3">
                  ₹{ride.price}
                </td>

                <td className="p-3">
                  <StatusBadge
                    status={ride.status}
                  />
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}