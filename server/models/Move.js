const { Schema, model } = require('mongoose');

const StatChangeSchema = new Schema(
    {
        change: {
            type: Number,
            required: true
        },
        statName: {
            type: String,
            required: true
        }
    },
    {
        _id: false
    }
);

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
        effectChance: {
            type: Number,
            required: false
        },
        effectEntry: {
            type: String,
            required: false
        },
        statChanges: [StatChangeSchema],
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
        ailment: {
            type: String,
            required: false
        },
        category: {
            type: String,
            required: false
        },
        critRate: {
            type: Number,
            required: false
        },
        drain: {
            type: Number,
            required: false
        },
        flinchChance: {
            type: Number,
            required: false
        },
        healing: {
            type: Number,
            required: false
        },
        maxHits: {
            type: Number,
            required: false
        },
        maxTurns: {
            type: Number,
            required: false
        },
        minHits: {
            type: Number,
            required: false
        },
        minTurns: {
            type: Number,
            required: false
        },
        statChance: {
            type: Number,
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
