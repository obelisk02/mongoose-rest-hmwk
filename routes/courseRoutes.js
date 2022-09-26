const router = require('express').Router();
const coursesController = require('../controllers/courseController');

router.get('/', coursesController.getAll);
router.get('/:id', coursesController.findOne);
router.post('/', coursesController.createCourse);
router.post('/:id/assignStudents', coursesController.assignStudents); // EJ: api/courses/632b44d68e28e3b3fd4f2d07/assignStudents
router.patch('/:id', coursesController.updateCourse);
router.delete('/:id', coursesController.deleteCourse);

module.exports = router;