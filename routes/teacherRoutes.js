const router = require('express').Router();
const teacherController = require('../controllers/teacherController');

router.get('/', teacherController.getAll);
router.get('/:id', teacherController.findOne);
router.post('/', teacherController.createTeacher);
router.patch('/:id', teacherController.updateTeacher);
router.delete('/', teacherController.deleteTeacher);

module.exports = router;