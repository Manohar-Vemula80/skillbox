import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UploadProof = () => {
  const [file, setFile] = useState(null);
  const [comments, setComments] = useState('');

  // 🔒 In the future, send this to backend using FormData
  // const handleSubmit = async () => {
  //   const formData = new FormData();
  //   formData.append('proof', file);
  //   formData.append('comments', comments);
  //   await axios.post('/api/upload-proof', formData);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Proof submitted:', { file, comments });
    alert('Proof submitted (demo)');
  };

  return (
    <>
      <Navbar />

      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Upload Proof</h1>

        <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Upload File</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Comments (optional)</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full border p-2 rounded"
              rows="4"
              placeholder="Describe what you completed..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Submit Proof
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default UploadProof;
