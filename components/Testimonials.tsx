import { Star } from "lucide-react";

const reviews = [
  {
    name: "Rahul Sharma",
    location: "Hyderabad",
    review:
      "The driver arrived on time and was very professional. Highly recommended!",
  },
  {
    name: "Priya Reddy",
    location: "Secunderabad",
    review:
      "Booked a driver for an airport trip. The experience was smooth and hassle-free.",
  },
  {
    name: "Arjun Kumar",
    location: "Gachibowli",
    review:
      "Excellent service! The booking process was simple and the driver was courteous.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">
          What Our Customers Say
        </h2>

        <p className="text-center text-gray-600 mb-12">
          Trusted by customers across Hyderabad.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-gray-50 rounded-2xl p-6 shadow hover:shadow-lg transition"
            >
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    size={18}
                    className="text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>

              <p className="text-gray-700 italic">
                "{review.review}"
              </p>

              <div className="mt-6">
                <h3 className="font-bold">{review.name}</h3>
                <p className="text-sm text-gray-500">
                  {review.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}