const express = require('express');
const router = express.Router();
const { getAllCourses, createCourse } = require('../controllers/Course.controller');

router.get('/', getAllCourses);
router.post('/create', createCourse); // (Optional: for admin or dev only)

module.exports = router;
