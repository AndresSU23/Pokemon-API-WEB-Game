const router = require('express').Router();
const { userAuth, adminAuth } = require('../utils/auth');

const { getRandomPokemon, getPokemonByRarity, getWildPokemonById, getMoveById } = require('../controllers/battleController');

router
    .route('/wild')
    .get(userAuth, getRandomPokemon);

router
    .route('/grass/:rarity')
    .get(userAuth, getPokemonByRarity);

router
    .route('/encounter/:pid')
    .get(userAuth, getWildPokemonById);

router
    .route('/move/:moveId')
    .get(userAuth, getMoveById);

module.exports = router;