import React from 'react';

const MakerCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition duration-300">
      <img
        src="https://source.unsplash.com/100x100/?person,profile"
        alt="Maker"
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
      />
      <h3 className="text-lg font-semibold text-gray-800">Manohar Vemula</h3>
      <p className="text-sm text-gray-500">Full Stack Mentor</p>
      <p className="text-sm mt-2 text-gray-600">
        Specializes in React, Node.js, MongoDB, and building scalable apps.
      </p>
      <button className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 text-sm">
        View Profile
      </button>
    </div>
  );
};

export default MakerCard;
