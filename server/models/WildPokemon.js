const { Schema, model } = require('mongoose');
const Pokemon = require('./Pokemon');
const Move = require('./Move');
const WildPokemonSchema = new Schema(
    {
        pokemonId : { type: Number },
        level : { type : Number },
        rarity : { type : String },
        shiny : { type: Boolean, default: false },
        hp : { type: Number },
        ivs: {
            hp: { type: Number },
            attack: { type: Number },
            defense: { type: Number },
            sp_attack: { type: Number },
            sp_defense: { type: Number },
            speed: { type: Number }
        },
        moveSet:  [ {moveId: { type : Schema.Types.ObjectId, ref: "Move" }, pp: Number, ppMax: Number} ],
        types: []
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

WildPokemonSchema.pre('save', async function(next) {

    if (this.isNew) {

        const pokemonData = await Pokemon.findOne({ pid: this.pokemonId });
        
        this.shiny = this.constructor.generateShiny();
        this.ivs = {
            hp: this.constructor.generateIVs() + pokemonData.baseStats.hp,
            attack: this.constructor.generateIVs() + pokemonData.baseStats.attack,
            defense: this.constructor.generateIVs() + pokemonData.baseStats.defense,
            sp_attack: this.constructor.generateIVs() + pokemonData.baseStats.sp_attack,
            sp_defense: this.constructor.generateIVs() + pokemonData.baseStats.sp_defense,
            speed: this.constructor.generateIVs() + pokemonData.baseStats.speed
        };

        this.hp = this.ivs.hp;


        this.types = pokemonData.types
        const eligibleMoves = pokemonData.learnSet
            .filter(move => move.level <= this.level)
            .sort((a, b) => b.level - a.level);
            
        // console.log(eligibleMoves);
        
        const shuffledMoves = eligibleMoves
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);

        const moveSet = await Promise.all(shuffledMoves.map(async (move) => {
            const moveData = await Move.findById(move.moveId);
            return {
                moveId: moveData._id,
                pp: moveData.pp,
                ppMax: moveData.pp
            };
        }));
        
        this.moveSet = moveSet;

    }

    next();
    
});


const WildPokemon = model('WildPokemon', WildPokemonSchema);

module.exports = WildPokemon;