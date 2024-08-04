const router = require('express').Router();
const { userAuth, adminAuth } = require('../utils/auth');

const { getRandomPokemon, getPokemonByRarity } = require('../controllers/battleController');

router
    .route('/wild')
    .get(userAuth, getRandomPokemon);

router
    .route('/test/:rarity')
    .get(userAuth, getPokemonByRarity);

module.exports = router;