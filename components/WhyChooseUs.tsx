import { ShieldCheck, Clock3, BadgeCheck, Users } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Drivers",
    description: "All our drivers are background-verified and experienced.",
  },
  {
    icon: Clock3,
    title: "24/7 Availability",
    description: "Book a professional driver anytime you need.",
  },
  {
    icon: BadgeCheck,
    title: "Affordable Pricing",
    description: "Transparent hourly pricing with no hidden charges.",
  },
  {
    icon: Users,
    title: "Trusted Service",
    description: "Hundreds of satisfied customers trust DSK DriveMate.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose DSK DriveMate?
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition"
              >
                <Icon className="mx-auto text-blue-600" size={42} />

                <h3 className="text-xl font-semibold mt-4">
                  {feature.title}
                </h3>

                <p className="text-gray-600 mt-3">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}