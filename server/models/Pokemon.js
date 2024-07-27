const { Schema, model } = require('mongoose');

const PokemonSchema = new Schema(
    {

        pid : { 
            type: Number, 
            required: true
        },

        name : {
            type : String,
            unqiue : true,
            required: true
        },

        types : [],

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