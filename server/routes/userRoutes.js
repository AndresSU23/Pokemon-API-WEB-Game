const router = require('express').Router();
const { userAuth, adminAuth } = require('../utils/auth');

const { loginUser, verifyUser } = require('../controllers/userController');

router
    .route('/login')
    .post(loginUser);

router
    .route('/verify')
    .get(userAuth, verifyUser);


module.exports = router;