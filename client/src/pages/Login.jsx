// src/pages/Login.jsx
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login,loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>; // ⬅️ Show loading state

  const sendOtp = async () => {
    try {
      const res = await axios.post('https://skillbox-e0tj.onrender.com/api/auth/send-otp', { email });
      setMessage(res.data.message);
      setOtpSent(true);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to send OTP');
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post('https://skillbox-e0tj.onrender.com/api/auth/verify-otp', { email, otp });
       console.log('[Login] verifyOtp response:', res.data);

       login(res.data.user, res.data.token); 
       console.log('[Login] after login(), context user should be:', res.data.user);// ✅ update context
      setMessage(res.data.message);
      setTimeout(() => navigate('/dashboard'));
    } catch (err) {
      setMessage(err.response?.data?.error || 'Invalid OTP');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">OTP Login</h2>

        {!otpSent ? (
          <>
            <label className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring"
              placeholder="you@example.com"
            />
            <button onClick={sendOtp} className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
              Send OTP
            </button>
          </>
        ) : (
          <>
            <label className="block mb-2 text-sm font-medium text-gray-700">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              className="w-full px-4 py-2 border rounded mb-4 focus:outline-none focus:ring"
              placeholder="6-digit OTP"
            />
            <button onClick={verifyOtp} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Verify OTP
            </button>
          </>
        )}

        {message && <p className="mt-4 text-center text-sm text-gray-700">{message}</p>}

        <p className="mt-6 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-600 hover:underline font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
