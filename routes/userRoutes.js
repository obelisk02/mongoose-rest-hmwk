const router = require('express').Router();
const userController = require('../controllers/userController');
const { authRequired } = require('../middlewares');

router.post('/signup', userController.signUp);
router.post('/login', userController.logIn);
router.get('/user', authRequired, userController.getUser);

module.exports = router;
