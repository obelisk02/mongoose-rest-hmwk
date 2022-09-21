const router = require('express').Router();
const teacherController = require('../controllers/teacherController');

router.get('/', teacherController.getAllTeachers);
router.get('/:id', teacherController.findTeacher);
router.post('/', teacherController.createTeacher);
router.patch('/:id', teacherController.updateTeacher);
router.delete('/', teacherController.deleteTeacher);

module.exports = router;