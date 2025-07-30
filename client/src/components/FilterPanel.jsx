import React, { useState } from 'react';

const FilterPanel = ({ onApply }) => {
  const [category, setCategory] = useState('All');
  const [price, setPrice] = useState('All');
  const [level, setLevel] = useState('All');

  const handleApply = () => {
    onApply({ category, price, level });
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-full max-w-sm mb-8">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      {/* Category Filter */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Category</label>
        <select
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>All</option>
          <option>Development</option>
          <option>Data Science</option>
          <option>Design</option>
          <option>Marketing</option>
          <option>Finance</option>
          <option>IT & Software</option>
          <option>Photography</option>
          <option>Health</option>
          <option>Business</option>
          <option>Writing</option>
          <option>Language</option>
          <option>Video</option>
          <option>Music</option>
        </select>
      </div>

      {/* Price Filter */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Price Range</label>
        <select
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        >
          <option>All</option>
          <option>Below ₹500</option>
          <option>₹500 - ₹1000</option>
          <option>Above ₹1000</option>
        </select>
      </div>

      {/* Level Filter */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Level</label>
        <select
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option>All</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
      </div>

      <button
        onClick={handleApply}
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterPanel;
