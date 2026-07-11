import { Search, UserCheck, Car } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "1. Request a Driver",
    description: "Enter your trip details, date, and the number of hours you need a driver.",
  },
  {
    icon: UserCheck,
    title: "2. Driver Assigned",
    description: "Our team assigns a verified and experienced professional driver.",
  },
  {
    icon: Car,
    title: "3. Enjoy Your Journey",
    description: "Your driver arrives on time and safely drives your own vehicle.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">
          How It Works
        </h2>

        <p className="text-center text-gray-600 mb-12">
          Hiring a professional driver takes just three simple steps.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="bg-blue-50 rounded-2xl p-8 text-center hover:shadow-lg transition"
              >
                <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-blue-600 text-white mb-6">
                  <Icon size={32} />
                </div>

                <h3 className="text-2xl font-semibold mb-3">
                  {step.title}
                </h3>

                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}