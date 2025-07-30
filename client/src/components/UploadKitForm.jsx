import React, { useState } from 'react';

const UploadKitForm = () => {
  const [file, setFile] = useState(null);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle upload later
    alert('Submission uploaded (placeholder)');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Submit Your Proof of Work
      </h2>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Screenshot / File
        </label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
      </div>

      {/* Optional Comments */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Comment (optional)
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="3"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          placeholder="Explain what you did..."
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
      >
        Submit Proof
      </button>
    </form>
  );
};

export default UploadKitForm;
