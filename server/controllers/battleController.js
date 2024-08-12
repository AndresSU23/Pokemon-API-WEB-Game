const { Pokemon, WildPokemon, Move } = require('../models');

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
        try {
            const { rarity } = req.params;

            const wild_pokemon = await Pokemon.find({ rarity });

            if (!wild_pokemon.length) {
                return res.status(404).json({ message: 'No Pokemon found with the specified rarity' });
            }

            const random = wild_pokemon[Math.floor(Math.random() * wild_pokemon.length)];

            res.json(random.pid);
        } catch (error) {
            console.error("Error retrieving wild Pokémon:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    async getWildPokemonById(req, res) {
        try {
            const { pid } = req.params;
            
            const pokemonData = await Pokemon.findOne({ pid: pid });
            
            if (!pokemonData) {
                return res.status(404).json({ message: "Pokémon not found" });
            }
            const new_pokemon = await WildPokemon.create({ pokemonId: pokemonData.pid, level: 5 });

            const pokemon = {
                ...new_pokemon.toObject(),
                sprite: pokemonData.sprite,
                name: pokemonData.name
            };
            res.json(pokemon);
        } catch (error) {
            console.error("Error retrieving wild Pokémon:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },

    async getMoveById(req, res) {
        try {
            const { moveId } = req.params;

            const move = await Move.findById(moveId);

            if (!move) {
                return res.status(404).json({ message: "Move not found" });
            }

            res.json(move);
        } catch (error) {
            console.error("Error retrieving move:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = battleController;
