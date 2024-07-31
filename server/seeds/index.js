const fs = require('fs');
const mongoose = require('mongoose');
const connect = require('../config/connection');
const { User, Pokemon, Move } = require('../models');

require('dotenv').config();

const bcrypt = require('bcrypt');
const SALT_FACTOR = 10;

let users, starters, wild_pokemon, legendaries;

const initialize = () => new Promise((resolve, reject) => { 

    fs.readFile('./data/users.json', 'utf-8', (err, data) => {

        if (!err) users = JSON.parse(data);
        else { reject("Failed to read users.json file..."); return };

    });

    fs.readFile('./data/starters.json', 'utf-8', (err, data) => {

        if (!err) starters = JSON.parse(data);
        else { reject("Failed to read starters.json file..."); return };

    });

    fs.readFile('./data/wild.json', 'utf-8', (err, data) => {

        if (!err) wild_pokemon = JSON.parse(data);
        else { reject("Failed to read wild.json file..."); return };

    });

    fs.readFile('./data/legendaries.json', 'utf-8', (err, data) => {

        if (!err) legendaries = JSON.parse(data);
        else { reject("Failed to read wild.json file..."); return };

    });

    resolve();

});

const seedUsers = async () => {

    await User.deleteMany({});

    const users_hash = await Promise.all(

        users.map(async (user) => {

            const hash_pw = await bcrypt.hash(user.password, SALT_FACTOR);
            return { ...user, password: hash_pw }

        })

    )

    await User.insertMany(users_hash);

    console.log("\nSeeding Users completed...\n");

}

const seedPokemon = async () => {

    try {

        await Pokemon.deleteMany({});

        const all_pokemon = [ ...starters, ...wild_pokemon, ...legendaries ];

        const pokemon = await Promise.all(
            
            all_pokemon.map(async (p) => {

                const obj = {};
                const types = [];
                
                const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${p.id}`);
                const response = await data.json();

                // console.log(response.stats);

                response.types.forEach(t => types.push(t.type.name))

                obj.name = response.name;
                obj.types = types;
                obj.pid = p.id;
                obj.baseStats = {
                    hp: response.stats[0].base_stat,
                    attack: response.stats[1].base_stat,
                    defense: response.stats[2].base_stat,
                    sp_attack: response.stats[3].base_stat,
                    sp_defense: response.stats[4].base_stat,
                    speed: response.stats[5].base_stat,
                }

                const learnSet = await Promise.all( 
                    
                    response.moves.map(async (m) => {
                    
                        const move = await Move.findOne({ name: m.move.name })
                        if (move) return move._id;

                    })

                )

                obj.learnSet = learnSet;

                return obj;

            })
        );

        await Pokemon.insertMany(pokemon);

        console.log("Seeding All Pokemon completed...\n");

    }

    catch (error) { console.log(error); }

}

const seedMoves = async (defaultGen = 4) => {
    try {
        await Move.deleteMany({});
        
        let chosenMoves = [];

        for (let gen = 1; gen <= defaultGen; gen++) {
            const genData = await fetch(`https://pokeapi.co/api/v2/generation/${gen}`);
            const genResponse = await genData.json();
            
            genResponse.moves.forEach(move => chosenMoves.push(move.url));
        }

        const moves = await Promise.all(
            chosenMoves.map(async (moveUrl) => {
                const moveObj = {};
                
                const data = await fetch(moveUrl);
                const response = await data.json();

                if (!response.meta) return null;

                moveObj.id = response.id;
                moveObj.name = response.name;
                moveObj.accuracy = response.accuracy;
                moveObj.effectChance = response.effect_chance;
                moveObj.effectEntry = response.effect_entries.length > 0 ? response.effect_entries[0].effect : null;

                moveObj.statChanges = response.stat_changes.map(sc => ({
                    change: sc.change,
                    statName: sc.stat.name
                }));

                moveObj.target = response.target.name;
                moveObj.type = response.type.name;
                moveObj.power = response.power;
                moveObj.pp = response.pp;
                moveObj.priority = response.priority;
                moveObj.ailment = response.meta ? response.meta.ailment.name : null;
                moveObj.category = response.meta ? response.meta.category.name : null;
                moveObj.critRate = response.meta ? response.meta.crit_rate : null;
                moveObj.drain = response.meta ? response.meta.drain : null;
                moveObj.flinchChance = response.meta ? response.meta.flinch_chance : null;
                moveObj.healing = response.meta ? response.meta.healing : null;
                moveObj.maxHits = response.meta ? response.meta.max_hits : null;
                moveObj.maxTurns = response.meta ? response.meta.max_turns : null;
                moveObj.minHits = response.meta ? response.meta.min_hits : null;
                moveObj.minTurns = response.meta ? response.meta.min_turns : null;
                moveObj.statChance = response.meta ? response.meta.stat_chance : null;

                return moveObj;
            })
        );

        const filteredMoves = moves.filter(move => move !== null);

        await Move.insertMany(filteredMoves);

        console.log("Seeding all moves completed...\n");
    } catch (error) {
        console.log(error);
    }
}


const seedTestData = async () => {

    const pokemon = await Promise.all(

        starters.map(async (p) => {

            const starter = await Pokemon.find({ pid: p.id });
            starter.level = 5;
            return starter;

        })

    );


    const user = await User.findOne({ username: "admin" });

    if (user) {

        const starters = pokemon.map(p => ({ pokemonId: p._id, level: p.level }));
        user.pokemon = starters;
        await user.save();

        console.log("Seeded Test Data to admin users...\n");

    }

}

connect()
    .then(() => initialize())
    .then(() => seedUsers())
    // .then(() => seedMoves())
    .then(() => seedPokemon())
    .then(() => seedTestData())
    .then(() => mongoose.connection.close())
    .catch(err => console.log(err))