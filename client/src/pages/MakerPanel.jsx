import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// import { fetchMakerKits } from '../utils/api'; // 🔒 future API

const MakerPanel = () => {
  // 🔧 Temporary static data
  const makerKits = [
    {
      id: 'kit1',
      title: 'Frontend Basics Kit',
      description: 'Covers HTML, CSS, and JS fundamentals.',
      price: 499,
      level: 'Beginner',
    },
    {
      id: 'kit2',
      title: 'Advanced React Kit',
      description: 'Hooks, Context API, and performance patterns.',
      price: 899,
      level: 'Advanced',
    },
  ];

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Maker Panel</h1>

        {/* Upload Form */}
        <div className="bg-white shadow p-6 rounded mb-10">
          <h2 className="text-xl font-semibold mb-4">Upload New Kit</h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <input
                type="text"
                className="w-full mt-1 px-3 py-2 border rounded"
                placeholder="Enter kit title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Price (₹)</label>
              <input
                type="number"
                className="w-full mt-1 px-3 py-2 border rounded"
                placeholder="499"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Description</label>
              <textarea
                className="w-full mt-1 px-3 py-2 border rounded"
                rows="3"
                placeholder="Brief description of the kit"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Level</label>
              <select className="w-full mt-1 px-3 py-2 border rounded">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Image</label>
              <input
                type="file"
                className="w-full mt-1"
              />
            </div>

            <div className="md:col-span-2 mt-4">
              <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
                Upload Kit
              </button>
            </div>
          </form>
        </div>

        {/* Maker's Kits List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Uploaded Kits</h2>
          <div className="space-y-4">
            {makerKits.map((kit) => (
              <div
                key={kit.id}
                className="border rounded p-4 shadow-sm bg-white"
              >
                <h3 className="text-lg font-bold">{kit.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{kit.description}</p>
                <p className="text-sm font-medium">Level: {kit.level}</p>
                <p className="font-semibold text-green-700">₹{kit.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MakerPanel;
