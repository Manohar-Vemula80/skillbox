// src/context/CartContext.jsx
import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // ✅ Clean corrupted cart data (missing _id)
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems'));
    if (storedCart?.some(item => !item._id)) {
      console.warn("⚠️ Invalid items in cart. Clearing...");
      localStorage.removeItem('cartItems');
      setCartItems([]);
    }
  }, []);

  // ✅ Sync updated cartItems to localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (course) => {
    if (!course._id) {
      console.error('⛔ Course is missing _id:', course);
      return;
    }

    setCartItems((prevItems) => {
      const exists = prevItems.find((item) => item._id === course._id);
      if (exists) return prevItems;
      return [...prevItems, course];
    });
  };

  const removeFromCart = (courseId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== courseId)
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
