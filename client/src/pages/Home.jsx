import React from 'react';
import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

const Home = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/login');
  };

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4"
        style={{
          backgroundImage: `url('https://t3.ftcdn.net/jpg/03/44/67/38/360_F_344673825_6fU6IORyipkYpfU1mg2vmxtHxDToUO6Q.jpg')`,
        }}
      >
        <div className="bg-white bg-opacity-80 p-10 rounded-xl shadow-md text-center max-w-xl">
          <h1 className="text-4xl font-bold mb-6">Welcome to SkillBox 🎓</h1>
          <p className="text-lg mb-8">
            Learn, earn rewards, and grow your skills with our curated online learning platform. Start your journey today!
          </p>
          <button
            onClick={handleContinue}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 text-lg transition"
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
