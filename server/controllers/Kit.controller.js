const Course = require('../models/Course');

// GET /api/courses/title/:title
exports.getCourseByTitle = async (req, res) => {
  try {
    const titleParam = req.params.title.toLowerCase().replace(/-/g, ' ');
    
    const course = await Course.findOne({
      title: { $regex: new RegExp(`^${titleParam}$`, 'i') }
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found.' });
    }

    res.json(course);
  } catch (err) {
    console.error('Error fetching course by title:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
