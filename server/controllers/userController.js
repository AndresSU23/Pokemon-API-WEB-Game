const { User, Pokemon } = require('../models');
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

    },

    registerUser({ body }, res) {

        User.create({ username: body.username, password: body.password })
            .then(data => res.json(data))
            .catch(err => res.json(err))

    },

    async getUserPokemon(req, res) {

        try {

            const user = await User.findOne({ username: req.user.username });

            const pokemon = user.pokemon.map(async (p) => { 

                const user_p = await Pokemon.findOne({ pid: p.pokemonId });
                user_p.level = p.level;
                
                return { 
                    ...user_p.toObject(),
                    level: p.level,
                    shiny : p.shiny,
                    ivs : p.ivs
                }
            
            });

            const user_pokemon = await Promise.all(pokemon);

            res.json(user_pokemon)

        }

        catch (error) { res.json(error); }

    },

    async addPokemon(req, res) {

        try {

            const user = await User.findOne({ username: req.user.username });

            const new_pokemon = {
                pokemonId : req.body.pid,
                level : req.body.level
            }

            user.pokemon = [ ...user.pokemon, new_pokemon ];
            await user.save();

            res.json(new_pokemon);

        }

        catch (error) { res.json(error); }
        
    }

}

module.exports = userController;