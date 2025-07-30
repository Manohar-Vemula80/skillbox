import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* SkillBox Info */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">SkillBox</h3>
          <p className="text-sm text-gray-400">Empowering you to master skills, earn rewards, and grow your career.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/courses" className="hover:text-white">Courses</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
            <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-white">Contact Us</h4>
          <p className="text-sm text-gray-400">manoharvemula57@gmail.com</p>
          <p className="text-sm text-gray-400 mt-1">+91 86687 97704</p>
        </div>

        {/* Socials */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-white">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="https://www.linkedin.com/in/manohar-vemula-946496313?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="hover:text-white">LinkedIn</a>
            <a href="https://www.instagram.com/?hl=en" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">YouTube</a>
          </div>
        </div>

      </div>

      <div className="mt-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} SkillBox. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
