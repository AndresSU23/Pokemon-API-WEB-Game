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

        rarity: { type: String },
        sprite: { type: Object },
        types : [],
        baseStats : { type: Object },
        learnSet: [ { type : Schema.Types.ObjectId, ref: "Move" } ],

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