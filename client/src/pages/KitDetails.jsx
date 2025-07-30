import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { info } from '../assets/info'; // static local data
import { CartContext } from '../context/CartContext';

const KitDetails = () => {
  const { title } = useParams();
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Find course by title slug
  const kit = info.find(
    (item) =>
      item.title.toLowerCase().replace(/\s+/g, '-') === title.toLowerCase()
  );

  if (!kit) {
    return <div className="text-center text-red-500 mt-10">Kit not found</div>;
  }

  const imageUrl = Array.isArray(kit.image) ? kit.image[0] : kit.image;

  const handleAddToCart = () => {
    addToCart({
      _id: kit._id,
      title: kit.title,
      description: kit.description,
      price: kit.price,
      image: imageUrl,
      category: kit.category,
      level: kit.level,
    });
    navigate('/cart');
  };

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="bg-white rounded shadow p-6 flex flex-col md:flex-row items-start gap-8">
          <img
            src={imageUrl}
            alt={kit.title}
            className="w-full md:w-1/2 rounded object-cover"
          />

          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">{kit.title}</h2>
            <p className="text-gray-600 mb-4">{kit.description}</p>
            <p className="text-lg font-semibold mb-2">Level: {kit.level}</p>
            <p className="text-2xl font-bold text-green-600 mb-4">₹{kit.price}</p>

            <button
              onClick={handleAddToCart}
              className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default KitDetails;
