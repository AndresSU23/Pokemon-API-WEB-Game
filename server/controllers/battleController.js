const { Pokemon, WildPokemon } = require('../models');

const battleController = {

    async getRandomPokemon(req, res) {
        const wild_pokemon = await Pokemon.find({ rarity: { $in: ["common", "rare", "uncommon"] } });
        const random = wild_pokemon[Math.floor(Math.random() * wild_pokemon.length)];
        const new_pokemon = await WildPokemon.create({ pokemonId: random.pokemonId, level: 5 });

        const pokemon = {
            ...new_pokemon.toObject(),
            sprite: random.sprite,
            name: random.name
        }

        res.json(pokemon);
    },

    async getPokemonByRarity(req, res) {

        const { rarity } = req.params;

        const wild_pokemon = await Pokemon.find({ rarity });
        if (!wild_pokemon.length) {
            return res.status(404).json({ message: 'No Pokemon found with the specified rarity' });
        }

        const random = wild_pokemon[Math.floor(Math.random() * wild_pokemon.length)];
        const new_pokemon = await WildPokemon.create({ pokemonId: random.pokemonId, level: 5 });

        const pokemon = {
            ...new_pokemon.toObject(),
            sprite: random.sprite,
            name: random.name
        }

        res.json(pokemon);
    }

}

module.exports = battleController;
