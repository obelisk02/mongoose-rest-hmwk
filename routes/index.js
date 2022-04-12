const router = require('express').Router();
const userRoutes = require('./userRoutes');
const petRoutes = require('./petRoutes');
const productRoutes = require('./productRoutes');

router.use('/auth', userRoutes);
router.use('/pets', petRoutes);
router.use('/products', productRoutes);

module.exports = router;