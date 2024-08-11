const router = require('express').Router();
const { userAuth, adminAuth } = require('../utils/auth');

const { getPokedex, getPokemonById } = require('../controllers/pokemonController');
const { route } = require('./battleRoutes');

router
    .route('/')
    .get(getPokedex);

router
    .route('/:id')
    .get(getPokemonById);

module.exports = router;