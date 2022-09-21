const router = require('express').Router();
const coursesController = require('../controllers/courseController');

router.get('/', coursesController.getAll);
router.get('/:id', coursesController.findOne);
router.post('/', coursesController.createCourse);
router.patch('/:id', coursesController.updateCourse);
router.delete('/:id', coursesController.deleteCourse);

module.exports = router;