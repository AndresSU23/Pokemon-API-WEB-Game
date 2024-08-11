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
        learnSet: [ { moveId: {type : Schema.Types.ObjectId, ref: "Move"}, level: Number } ],
        description : { type: String }

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