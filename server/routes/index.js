const router = require('express').Router();

const userRoutes = require('./userRoutes');
const battleRoutes = require('./battleRoutes');
const pokemonRoutes = require('./pokemonRoutes');

router.use('/users', userRoutes);
router.use('/battle', battleRoutes);
router.use('/pokedex', pokemonRoutes);

module.exports = router;