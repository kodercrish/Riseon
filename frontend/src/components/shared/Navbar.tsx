// src/components/Navbar.tsx
import { Link } from 'react-router-dom';
import api from '../../api/axios.ts';

export default function Navbar() {
  const handleLogout = async () => {
    await api.post('/auth/logout'); // clear cookie on backend
    window.location.reload(); // reload to reset auth state
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold">Riseon</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline text-sm">Home</Link>
        <button onClick={handleLogout} className="text-sm hover:underline">
          Logout
        </button>
      </div>
    </nav>
  );
}