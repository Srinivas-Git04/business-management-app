"use client";

export default function Navbar() {
  return (
    <header className="bg-white border-b px-8 py-5 flex justify-between items-center">

      <div>
        <h1 className="text-2xl font-bold">
          Admin Panel
        </h1>

        <p className="text-gray-500">
          Welcome back 👋
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          A
        </div>
      </div>

    </header>
  );
}