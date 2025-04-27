import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-blue-700 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Health System</h1>
        <ul className="flex space-x-8">
          <li>
            <Link to="/" className="hover:text-gray-300 transition duration-200">Home</Link>
          </li>
          <li>
            <Link to="/clients" className="hover:text-gray-300 transition duration-200">Clients</Link>
          </li>
          <li>
            <Link to="/programs" className="hover:text-gray-300 transition duration-200">Programs</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
