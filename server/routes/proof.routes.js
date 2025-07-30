// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const { uploadProof } = require('../controllers/proof.controller');

// // 📁 Setup Multer for file upload
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Make sure uploads/ folder exists
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// const upload = multer({ storage });

// router.post('/upload-proof', upload.single('proof'), uploadProof);

// module.exports = router;
