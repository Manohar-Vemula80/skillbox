import React from 'react';

const BadgeCard = () => {
  return (
    <div className="bg-white border rounded-lg shadow-md p-4 text-center hover:shadow-lg transition">
      <img
        src="https://source.unsplash.com/100x100/?medal,award"
        alt="Badge"
        className="w-20 h-20 mx-auto mb-3 rounded-full object-cover"
      />
      <h3 className="text-lg font-semibold text-gray-800">React Champion</h3>
      <p className="text-sm text-gray-500">Earned for completing React module</p>
    </div>
  );
};

export default BadgeCard;
