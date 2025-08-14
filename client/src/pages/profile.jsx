// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [coins, setCoins] = useState(0);
  const [createdAt, setCreatedAt] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      navigate('/login');
      return;
    }

    setUser(storedUser);

    axios
      .get(`https://skillbox-e0tj.onrender.com/api/user/${storedUser._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCoins(res.data.coins || 0);
        setCreatedAt(res.data.createdAt || '');
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch profile:', err.response?.data || err.message);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!user) return <div className="text-center py-10 text-red-500">User not found. Please login again.</div>;

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">👤 User Details</h1>
        <div className="bg-white shadow p-6 rounded space-y-4">
          <div>
            <label className="text-sm font-medium block">Full Name</label>
            <div className="mt-1 border px-3 py-2 rounded bg-gray-50">{user.fullName}</div>
          </div>

          <div>
            <label className="text-sm font-medium block">Email</label>
            <div className="mt-1 border px-3 py-2 rounded bg-gray-50">{user.email}</div>
          </div>

          <div>
            <label className="text-sm font-medium block">Coins</label>
            <div
              onClick={() => navigate('/rewards')}
              title="Click to open Reward Store"
              className="mt-1 border px-3 py-2 rounded text-green-700 font-bold bg-gray-50 cursor-pointer hover:bg-green-100 transition"
            >
              🪙 {coins}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium block">Joined On</label>
            <div className="mt-1 border px-3 py-2 rounded bg-gray-50">
              📅 {createdAt ? new Date(createdAt).toLocaleDateString() : 'N/A'}
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
