const fs = require('fs');
const mongoose = require('mongoose');
const connect = require('../config/connection');
const { User, Pokemon } = require('../models');
const { axios } = require('axios');

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

                return obj;

            })
        );

        await Pokemon.insertMany(pokemon);

        console.log("Seeding All Pokemon completed...\n");

    }

    catch (error) { console.log(error); }

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
    .then(() => seedPokemon())
    .then(() => seedTestData())
    .then(() => mongoose.connection.close())
    .catch(err => console.log(err))