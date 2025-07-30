import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import axios from 'axios';
import { info } from '../assets/info'; // Assuming this is the local course data
import { useNavigate } from 'react-router-dom'; // ✅ Add this for navigation

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate(); // ✅ Initialize navigator

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/courses');
        setCourses(res.data);
      } catch (err) {
        console.error('Error fetching courses', err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to SkillBox</h1>
        <p className="text-lg md:text-xl mb-6">
          Master real-world skills, earn badges, and prove your talent.
        </p>
        <a
          href="/courses"
          className="inline-block bg-white text-indigo-600 px-6 py-3 rounded font-semibold hover:bg-gray-100"
        >
          Get Started
        </a>
      </section>

      {/* Highlights Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Why SkillBox?</h2>
          <p className="text-gray-600">
            Learn, earn badges, upload proof, and build your portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center">
          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">📘 Learn Skills</h3>
            <p className="text-gray-600 text-sm">Access quality video courses & materials.</p>
          </div>

          {/* ✅ Make this card clickable to navigate to /reward */}
          <div
            className="bg-white p-6 rounded shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => navigate('/rewards')}
          >
            <h3 className="text-xl font-semibold mb-2">🏆 Earn Badges</h3>
            <p className="text-gray-600 text-sm">Complete courses and upload proof to get badges.</p>
          </div>

          <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">🚀 Level Up</h3>
            <p className="text-gray-600 text-sm">Show off your progress and unlock rewards.</p>
          </div>
        </div>
      </section>

      {/* Featured Courses Preview */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto mb-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Popular Courses</h2>
          <p className="text-gray-500">Start with top trending picks</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {info.slice(0, 3).map((course, index) => (
            <ProductCard key={index} course={course} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Dashboard;
