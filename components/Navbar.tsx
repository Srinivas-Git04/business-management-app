export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-5 bg-white shadow-md">
      <h1 className="text-2xl font-bold text-blue-600">
        BusinessPro
      </h1>

      <div className="flex gap-6">
        <a href="#home">Home</a>
        <a href="#services">Services</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}