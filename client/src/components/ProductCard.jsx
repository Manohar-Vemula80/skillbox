// src/components/ProductCard.jsx

import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ course }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const { _id, title, description, price, image, category, level } = course;

  // Fallback image logic
  const imageUrl = Array.isArray(image) && image.length > 0
    ? image[0]
    : '/images/default-course.jpg';

  const handleAddToCart = () => {
    addToCart({
      _id,
      title,
      description,
      price,
      image: imageUrl,
      category,
      level,
    });
    navigate('/cart');
  };

  // Navigate to KitDetails by course title
  const handleCardClick = () => {
    const formattedTitle = title.toLowerCase().replace(/\s+/g, '-');
    navigate(`/kit/${formattedTitle}`);
  };

  return (
    <div
      className="bg-white rounded shadow p-4 cursor-pointer hover:shadow-lg transition"
      onClick={handleCardClick}
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-40 object-cover rounded mb-4"
      />
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-600 text-sm">{description}</p>
      <p className="mt-2 font-bold">₹{price}</p>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevent card click when adding to cart
          handleAddToCart();
        }}
        className="mt-3 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
