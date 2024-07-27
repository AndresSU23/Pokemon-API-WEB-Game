const { Schema, model } = require('mongoose');

const WildPokemonSchema = new Schema(
    {
        pokemonId : { type : Schema.Types.ObjectId, ref: "Pokemon" },
        level : { type : Number },
        rarity : { type : String }
    },

    {
        toJSON : {
            virtuals : true,
            getters : true
        }
    }

);

const Pokemon = model('WildPokemon', WildPokemonSchema);

module.exports = Pokemon;