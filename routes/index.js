const router = require('express').Router();
const userRoutes = require('./userRoutes');
const studentRoutes = require('./studentRoutes');
const teacherRoutes = require('./teacherRoutes');
const courseRoutes = require('./courseRoutes');

router.use('/auth', userRoutes);
router.use('/students', studentRoutes);
router.use('/teachers', teacherRoutes);
router.use('/courses', courseRoutes);

module.exports = router;