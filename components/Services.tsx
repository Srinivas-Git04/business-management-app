export default function Services() {
  const services = [
    {
      title: "Driver Management",
      description: "Book experienced drivers for your business and personal needs.",
    },
    {
      title: "Car Service with Driver",
      description: "Hire a driver and a car for safe and convenient travel.",
    },
    {
      title: "Self-Drive Car Rental",
      description: "Rent cars for your trips without a driver.",
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