const router = require('express').Router();
const { userAuth, adminAuth } = require('../utils/auth');

const { getRandomPokemon } = require('../controllers/battleController');

router
    .route('/wild')
    .get(userAuth, getRandomPokemon);

module.exports = router;