const { User } = require('../models');
const { checkUser, jwtOptions } = require('../utils/auth');
const jwt = require('jsonwebtoken');

const userController = {

    loginUser(req, res) {

        checkUser(req.body)

            .then((user) => {

                const expiresIn = '1h';

                let payload = {
                    _id : user._id,
                    username: user.username,
                    admin: user.admin
                };

                let token = jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn } );

                res.json({ message: "Login successful", username: user.username, token })

            })

            .catch((err) => res.status(422).json({ message: err }))

    },

    verifyUser(req, res) {

        try { res.json(req.user) }
        catch (err) { res.json(err) }

    }

}

module.exports = userController;