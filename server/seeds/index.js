const fs = require('fs');
const mongoose = require('mongoose');
const connect = require('../config/connection');
const { User, Pokemon, WildPokemon, Move } = require('../models');

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

        const pokemon = await Promise.all(
            Array.from({ length: 493 }, async (_, index) => {
                const id = index + 1;
                const obj = {};
                const types = [];
                
                const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const response = await data.json();

                response.types.forEach(t => types.push(t.type.name));

                obj.name = response.name;
                obj.types = types;
                obj.pid = id;

                obj.baseStats = {
                    hp: response.stats[0].base_stat,
                    attack: response.stats[1].base_stat,
                    defense: response.stats[2].base_stat,
                    sp_attack: response.stats[3].base_stat,
                    sp_defense: response.stats[4].base_stat,
                    speed: response.stats[5].base_stat,
                };

                let totalStats = 0;
                for (let stat in obj.baseStats) {
                    if (obj.baseStats.hasOwnProperty(stat)) {
                        totalStats += obj.baseStats[stat];
                    }
                }

                if (totalStats < 300) {
                    obj.rarity = 'common';
                } else if (totalStats < 500) {
                    obj.rarity = 'uncommon';
                } else {
                    obj.rarity = 'rare';
                }

                obj.sprite = { 
                    default: response.sprites.versions['generation-iv']['heartgold-soulsilver'].front_default,
                    shiny: response.sprites.versions['generation-iv']['heartgold-soulsilver'].front_shiny,
                    back: response.sprites.versions['generation-iv']['heartgold-soulsilver'].back_default,
                    back_shiny: response.sprites.versions['generation-iv']['heartgold-soulsilver'].back_shiny
                };

                const desc_response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
                const desc_data = await desc_response.json();

                obj.description = desc_data.flavor_text_entries[0].flavor_text;

                const learnSet = await Promise.all(
                    response.moves.map(async (m) => {
                        const move = await Move.findOne({ name: m.move.name });
                        if (move) return {moveId: move._id, level: m.version_group_details[0].level_learned_at};
                    })
                );

                obj.learnSet = learnSet.filter(id => id);  // filter out undefined values

                return obj;
            })
        );

        await Pokemon.insertMany(pokemon);

        console.log("Seeding All Pokemon completed...\n");

    } catch (error) {
        console.log(error);
    }
};


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
                if (response.meta.category.name.includes("damage")){
                    moveObj.id = response.id;
                    moveObj.name = response.name;
                    moveObj.accuracy = response.accuracy;
                    moveObj.target = response.target.name;
                    moveObj.type = response.type.name;
                    moveObj.power = response.power;
                    moveObj.pp = response.pp;
                    moveObj.priority = response.priority;
                    moveObj.category = response.meta ? response.meta.category.name : null;

                    return moveObj;
                }
                else return null
            })
        );

        const filteredMoves = moves.filter(move => move !== null);

        await Move.insertMany(filteredMoves);

        console.log("Seeding all moves completed...\n");

    } 
    
    catch (error) { console.log(error); }

}


const seedTestData = async () => {

    const pokemon = await Promise.all(

        starters.map(async (p) => {

            const new_pokemon = await WildPokemon.create({ pokemonId: p.id, level: 5, rarity: "starter" });
            return new_pokemon;

        })

    );

    const user = await User.findOne({ username: "admin" });

    if (user) {

        const starters = pokemon.map(p => ({ pokemonId: p.pokemonId, level: p.level, shiny: p.shiny, ivs: p.ivs, moveSet: p.moveSet }));
        user.pokemon = starters;
        await user.save();

        console.log("Seeded Test Data to admin users...\n");

    }

    await WildPokemon.deleteMany();

}

connect()
    .then(() => initialize())
    .then(() => seedUsers())
    .then(() => seedMoves())
    .then(() => seedPokemon())
    .then(() => seedTestData())
    .then(() => mongoose.connection.close())
    .catch(err => console.log(err))