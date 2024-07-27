const { Schema, model } = require('mongoose');

const PokemonSchema = new Schema(
    {
        name : {
            type : String,
            unqiue : true,
            required: true
        },

        types : [],

        level : { type: Number },

        rarity : { 
            type: String, 
            required: true
        }

    },

    {
        toJSON : {
            virtuals : true,
            getters : true
        }
    }

);

const Pokemon = model('Pokemon', PokemonSchema);

module.exports = Pokemon;