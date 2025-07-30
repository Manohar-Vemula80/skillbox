const User = require('../models/User');
const Course = require('../models/Course');

exports.enrollCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: 'Course not found' });

    // Get user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Check if already enrolled
    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ error: 'Already enrolled in this course' });
    }

    // Add course to user's enrolledCourses
    user.enrolledCourses.push(courseId);
    await user.save();

    res.status(200).json({ message: '✅ Course enrolled successfully', enrolledCourses: user.enrolledCourses });
  } catch (err) {
    console.error('Enrollment error:', err);
    res.status(500).json({ error: 'Server error during enrollment' });
  }
};
