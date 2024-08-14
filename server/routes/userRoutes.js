const router = require('express').Router();
const { userAuth, adminAuth } = require('../utils/auth');

const { loginUser, verifyUser, getUserPokemon, addPokemon, registerUser, getUserItems } = require('../controllers/userController');

router
    .route('/')
    .post(registerUser)

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

router
    .route('/items')
    .get(userAuth, getUserItems);


module.exports = router;