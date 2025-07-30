import React, { useState } from 'react';
import FilterPanel from '../components/FilterPanel';
import ProductCard from '../components/ProductCard';
import { info } from '../assets/info'; // static local data

const Courses = () => {
  const [filteredCourses, setFilteredCourses] = useState(info);

  const applyFilters = ({ category, price, level }) => {
    let filtered = info;

    if (category !== 'All') {
      filtered = filtered.filter(course => course.category === category);
    }

    if (price !== 'All') {
      if (price === 'Below ₹500') {
        filtered = filtered.filter(course => course.price < 500);
      } else if (price === '₹500 - ₹1000') {
        filtered = filtered.filter(course => course.price >= 500 && course.price <= 1000);
      } else if (price === 'Above ₹1000') {
        filtered = filtered.filter(course => course.price > 1000);
      }
    }

    if (level !== 'All') {
      filtered = filtered.filter(course => course.level === level);
    }

    setFilteredCourses(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 py-10 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-700">
          🚀 Boost Your Skills with SkillBox
        </h1>
        <p className="text-lg text-gray-700 mt-2">
          Choose from a variety of categories, earn badges, and level up your career.
        </p>
      </div>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Filter Sidebar */}
        <div className="md:w-1/4">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-10">
            <FilterPanel onApply={applyFilters} />
          </div>
        </div>

        {/* Course Grid */}
        <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg transform transition hover:-translate-y-1 hover:shadow-2xl duration-300"
            >
              <ProductCard course={course} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
