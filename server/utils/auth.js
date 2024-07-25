const { User } = require('../models');
const bcrypt = require('bcrypt');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey : process.env.PASSPORT_SECRET
}

let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {

    (jwt_payload) &&

        next(null, {
            _id : jwt_payload._id,
            username : jwt_payload.username,
            admin : jwt_payload.admin
        })

    (!jwt_payload) && next(null, false);

});

const userAuth = (req, res, next) => {

    const token = req.headers.authorization;
    if (!token) return res.status(401).json("Unauthorized, no token!");

    else {

        jwt.verify(token.split(' ')[1], jwtOptions.secretOrKey, (err, decoded) => {

            if (err) {
                console.error(err);
                return res.status(401).json("Unauthorized, invalid token presented");
            }

            else { req.user = decoded; next(); }

        })

    }

}

const adminAuth = (req, res, next) => {

    if (req.user.admin) next();
    else res.status(401).json("This user does not have admin privleges");

}

const checkUser = (data) => new Promise(function (resolve, reject) { 

    User.findOne({ username: data.username })

        .then((user) => {

            if (!user) reject("Unable to find user: " + data.username);
            else {

                bcrypt.compare(data.password, user.password)

                    .then((res) => {

                        if (res === true) resolve(user);
                        else reject("Incorrect password or username...");

                    })

            }

        })

        .catch((err) => reject("Unable to find user..."))

});

module.exports = {
    userAuth,
    adminAuth,
    checkUser,
    strategy,
    jwtOptions
}