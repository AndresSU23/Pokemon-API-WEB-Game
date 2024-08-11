const { Pokemon } = require('../models');

const pokemonController = {

    async getPokedex(req, res) {

        await Pokemon.find({})
            .then(data => res.json(data))
            .catch(err => res.json(err))

    },


    async getPokemonById(req, res) {

        await Pokemon.findOne({ pid: req.params.id })
            .then(data => res.json(data))
            .catch(err => res.json(err))

    }

}

module.exports = pokemonController;