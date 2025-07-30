// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  if (loading) return null; // Wait until context is fully loaded

  return (
    <nav className="bg-indigo-600 text-white shadow px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">SkillBox</Link>

      <div className="space-x-6 hidden sm:flex">
        <Link to="/courses" className="hover:text-gray-200 transition">Courses</Link>
        <Link to="/cart" className="hover:text-gray-200 transition">Cart</Link>
        {user && <Link to="/dashboard" className="hover:text-gray-200 transition">Dashboard</Link>}
      </div>

      <div className="space-x-4">
        {user ? (
          <img
            src={user.avatarUrl || 'https://i.pravatar.cc/40'}
            alt="Profile"
            className="w-9 h-9 rounded-full cursor-pointer"
            onClick={() => navigate('/profile')}
          />
        ) : (
          <Link
            to="/login"
            className="border border-white px-4 py-1 rounded font-medium hover:bg-white hover:text-indigo-600"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
