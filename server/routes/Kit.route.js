const express = require('express');
const router = express.Router();
const { getCourseByTitle } = require('../controllers/Kit.controller');

// Existing route
// router.get('/:id', getCourseById); // Keep this if you still use _id elsewhere

// New route for fetching by title
router.get('/title/:title', getCourseByTitle);

module.exports = router;
