import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const { user, loading } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.fullName || '');
      setEmail(user.email || '');
    }
  }, [user]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = async () => {
    if (!user) {
      setError('You must be logged in to place an order.');
      return;
    }

    if (!cartItems.length) {
      setError('Your cart is empty.');
      return;
    }

    if (cartItems.some(item => !item._id)) {
      setError('One of your cart items is missing its ID.');
      return;
    }

    setPlacingOrder(true);
    setError('');

    const payload = {
      userId: user._id,
      name: name.trim(),
      email: email.trim(),
      items: cartItems.map(item => item._id), // ✅ send ObjectId strings
      totalAmount: total
    };

    console.log("✅ Payload sent to backend:", payload);

    try {
      await axios.post('http://localhost:5000/api/order/checkout', payload);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong during checkout.');
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded shadow-md p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Courses in Your Cart</h2>
          <ul className="divide-y">
            {cartItems.map((item, index) => (
              <li key={item._id || index} className="py-2 flex justify-between">
                <span>{item.title}</span>
                <span>₹{item.price}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Your Details</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring"
            />
          </div>
        </div>

        {error && (
          <div className="text-red-600 text-sm mb-4 text-center">
            {error}
          </div>
        )}

        <button
          onClick={placeOrder}
          disabled={placingOrder}
          className="w-full bg-indigo-500 text-white py-3 rounded font-medium hover:bg-indigo-600 disabled:opacity-50"
        >
          {placingOrder ? 'Placing Order...' : 'Place Order & Enroll'}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
