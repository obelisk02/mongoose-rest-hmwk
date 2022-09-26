const router = require('express').Router();
const studentController = require('../controllers/studentController');

router.get('/', studentController.getAll);
router.get('/search', studentController.searchByName); // Example /students/search?name=Antonio
router.get('/:id', studentController.findOne);
router.post('/', studentController.createStudent);
router.patch('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

module.exports = router;