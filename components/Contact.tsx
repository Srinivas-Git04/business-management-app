"use client";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-20 px-8 bg-gray-100"
    >
      <div className="max-w-xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">
          Contact Us
        </h2>

        <form className="space-y-5">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border rounded-lg p-3"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border rounded-lg p-3"
          />

          <textarea
            placeholder="Your Message"
            rows={5}
            className="w-full border rounded-lg p-3"
          />

          <button
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}