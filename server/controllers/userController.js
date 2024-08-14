const { User, Pokemon, WildPokemon } = require('../models');
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

        User.create({ username: body.username, password: body.password, items : [ { name: "Pokeball", quantity: 5 }] })
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
                    hp: p.hp,
                    ivs : p.ivs,
                    moveSet: p.moveSet,
                    types: p.types,
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

            user.pokemon = [ ...user.pokemon, req.body.pokemon ];
            await user.save();

            res.json(req.body);

        }

        catch (error) { res.json(error); }

    },

    async getUserItems(req, res) {

        try {

            const user = await User.findOne({ username: req.user.username });
            res.json(user.items);

        }

        catch (error) { res.json(error); }

    },

    async updateUserItems(req, res) {

        try {

            const user = await User.findOne({ username: req.user.username });

            user.items = req.body.items.filter(item => item.quantity !== null && item.quantity > 0);
            await user.save();

            res.json(req.body);

        }

        catch (error) { res.json(error); }

    }

}

module.exports = userController;