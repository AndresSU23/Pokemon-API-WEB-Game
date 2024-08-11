const { Schema, model } = require('mongoose');
const { Pokemon } = require('./Pokemon');
const WildPokemonSchema = new Schema(
    {
        pokemonId : { type: Number },
        level : { type : Number },
        rarity : { type : String },
        shiny : { type: Boolean, default: false },
        ivs: {
            hp: { type: Number },
            attack: { type: Number },
            defense: { type: Number },
            sp_attack: { type: Number },
            sp_defense: { type: Number },
            speed: { type: Number }
        },
        moveSet:  [ {moveId: { type : Schema.Types.ObjectId, ref: "Move" }, pp: Number, ppMax: Number} ]
    },

    {
        toJSON : {
            virtuals : true,
            getters : true
        }
    }

);

WildPokemonSchema.statics.generateShiny = function() { return Math.random() < (1 / 2); };
WildPokemonSchema.statics.generateIVs = function() { return Math.round(Math.random() * 31); };

WildPokemonSchema.pre('save', function(next) {

    if (this.isNew) {

        this.shiny = this.constructor.generateShiny();
        this.ivs = {
            hp: this.constructor.generateIVs(),
            attack: this.constructor.generateIVs(),
            defense: this.constructor.generateIVs(),
            sp_attack: this.constructor.generateIVs(),
            sp_defense: this.constructor.generateIVs(),
            speed: this.constructor.generateIVs()
        };

    }

    next();
    
});


const WildPokemon = model('WildPokemon', WildPokemonSchema);

module.exports = WildPokemon;