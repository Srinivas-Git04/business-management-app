import DriverSidebar from "@/components/driver/DriverSidebar";
import DriverNavbar from "@/components/driver/DriverNavbar";

export default function DriverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <DriverSidebar />

      <div className="flex-1">

        <DriverNavbar />

        <main className="p-8">
          {children}
        </main>

      </div>

    </div>
  );
}