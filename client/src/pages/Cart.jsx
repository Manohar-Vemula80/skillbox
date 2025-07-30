// src/pages/Cart.jsx
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <>
      <h1 className='p-3 text-red-700 text-2xl'>SKILLBOX</h1>
      <button
        onClick={() => window.location.href = '/checkout'}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 fixed bottom-4 right-4"
      >
        Checkout
      </button>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="grid gap-6">
            {cartItems.map((course, index) => {
              const key = course._id || index; // ✅ Fallback to index if no _id

              return (
                <div
                  key={key}
                  className="flex items-center justify-between bg-white p-4 rounded shadow"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div>
                      <h2 className="text-xl font-semibold">{course.title}</h2>
                      <p className="text-gray-600 text-sm line-clamp-2">{course.description}</p>
                      <p className="font-bold text-green-600 mt-1">₹{course.price}</p>
                      <p className="text-sm text-gray-500">{course.category} • {course.level}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(course._id || key)} // match fallback
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
