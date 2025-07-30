// const Proof = require('../models/proof.model');

// exports.uploadProof = async (req, res) => {
//   try {
//     const { comments } = req.body;
//     const file = req.file;

//     if (!file) return res.status(400).json({ error: 'File is required' });

//     const proof = new Proof({
//       userId: req.body.userId, // in future: req.user.id (from token)
//       fileUrl: `/uploads/${file.filename}`,
//       comments
//     });

//     await proof.save();

//     res.status(201).json({
//       message: '✅ Proof uploaded successfully',
//       proof
//     });
//   } catch (err) {
//     console.error('Upload error:', err);
//     res.status(500).json({ error: 'Server error while uploading proof' });
//   }
// };
