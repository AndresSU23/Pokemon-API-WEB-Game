const { Schema, model } = require('mongoose');


const MoveSchema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },
        
        name: {
            type: String,
            required: true,
            unique: true
        },
        accuracy: {
            type: Number,
            required: false
        },
        target: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        power: {
            type: Number,
            required: false
        },
        pp: {
            type: Number,
            required: true
        },
        priority: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: false
        }
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

const Move = model('Move', MoveSchema);

module.exports = Move;
