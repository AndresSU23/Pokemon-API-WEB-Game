const router = require('express').Router();
const { userAuth, adminAuth } = require('../utils/auth');

const { loginUser, verifyUser, getUserPokemon, addPokemon } = require('../controllers/userController');

router
    .route('/login')
    .post(loginUser);

router
    .route('/verify')
    .get(userAuth, verifyUser);

router
    .route('/pokemon')
    .get(userAuth, getUserPokemon)
    .post(userAuth, addPokemon);


module.exports = router;