const router = require('express').Router();
const { userAuth, adminAuth } = require('../utils/auth');

const { getPokedex, getPokemonById } = require('../controllers/pokemonController');

router
    .route('/')
    .get(getPokedex);

router
    .route('/:id')
    .get(getPokemonById);

module.exports = router;