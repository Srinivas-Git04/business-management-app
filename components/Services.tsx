export default function Services() {
  const services = [
    {
      title: "Customer Management",
      description: "Manage customer information, history and communication.",
    },
    {
      title: "Employee Management",
      description: "Track employees, attendance and work assignments.",
    },
    {
      title: "Booking System",
      description: "Handle bookings and schedules with ease.",
    },
  ];

  return (
    <section
      id="services"
      className="py-20 px-8 bg-gray-100"
    >
      <h2 className="text-4xl font-bold text-center mb-12">
        Our Services
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.title}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
          >
            <h3 className="text-2xl font-semibold mb-4">
              {service.title}
            </h3>

            <p className="text-gray-600">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}