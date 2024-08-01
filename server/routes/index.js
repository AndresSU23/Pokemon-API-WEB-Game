const router = require('express').Router();

const userRoutes = require('./userRoutes');
const battleRoutes = require('./battleRoutes');

router.use('/users', userRoutes);
router.use('/battle', battleRoutes);

module.exports = router;