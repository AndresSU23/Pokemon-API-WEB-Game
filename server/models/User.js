const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_FACTOR = 10;

const TrainerPokemonSchema = new Schema(
    {
        pokemonId : { type : Number },
        level : { type: Number },
        shiny: { type: Boolean },
        ivs: {
            hp: { type: Number },
            attack: { type: Number },
            defense: { type: Number },
            sp_attack: { type: Number },
            sp_defense: { type: Number },
            speed: { type: Number }
        }
    }
);

const UserSchema = new Schema(
    {
        username : {
            type : String,
            required : "Username is required",
            trim : true,
            unqiue : true
        },

        password : {
            type : String,
            required : "Password is required"
        },

        admin : {
            type: Boolean,
            default : false
        },

        pokemon : [ TrainerPokemonSchema ]

    },

    {
        toJSON : {
            virtuals : true,
            getters : true
        }
    }

);

UserSchema.pre('save', async function save(next) {

    if (!this.isModified('password')) return next();

    try {

        const salt = await bcrypt.genSalt(SALT_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        return next();

    }

    catch (err) { return next(err) }

})

UserSchema.methods.validatePassword = function validatePassword(input) { return bcrypt.compareSync(input, this.password) }
const User = model('User', UserSchema);

module.exports = User;