export default function Hero() {
  return (
    <section
      id="home"
      className="flex flex-col justify-center items-center h-[80vh] text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white"
    >
      <h1 className="text-5xl font-bold">
        Manage Your Business Smarter
      </h1>

      <p className="mt-6 text-lg max-w-2xl">
        A complete solution to manage customers, employees,
        bookings, payments and reports from one place.
      </p>

      <button className="mt-8 bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200">
        Get Started
      </button>
    </section>
  );
}