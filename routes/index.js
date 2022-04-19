const router = require('express').Router();
const userRoutes = require('./userRoutes');
const petRoutes = require('./petRoutes');
const productRoutes = require('./productRoutes');
const ownerRoutes = require('./ownerRoutes');

router.use('/auth', userRoutes);
router.use('/pets', petRoutes);
router.use('/products', productRoutes);
router.use('/owners', ownerRoutes);

module.exports = router;