const fs = require('fs');
const mongoose = require('mongoose');
const connect = require('../config/connection');
const { User, Pokemon } = require('../models');
const { axios } = require('axios');

require('dotenv').config();

const bcrypt = require('bcrypt');
const SALT_FACTOR = 10;

let users, starters, wild_pokemon;

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

const seedStarters = async () => {

    try {

        await Pokemon.deleteMany({});

        const pokemon = await Promise.all(
            
            starters.map(async (p) => {

                const obj = {};
                const types = [];
                
                const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${p.id}`);
                const response = await data.json();

                response.types.forEach(t => types.push(t.type.name))

                obj.name = response.name;
                obj.types = types;
                obj.rarity = "starter";
                obj.level = 5;

                return obj;

            })
        )

        const inserted = await Pokemon.insertMany(pokemon);
        const user = await User.findOne({ username: "admin" });

        if (user) {

            user.pokemon = [ ...user.pokemon, ...inserted ];
            await user.save();

        }

        console.log("Seeding Pokemon Starters completed...\n");

    }

    catch (error) { console.log(error); }

}

const seedWild = async () => {

    const pokemon = await Promise.all(
        
        wild_pokemon.map(async (p) => {

            const obj = {};
            const types = [];
            
            const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${p.id}`);
            const response = await data.json();

            response.types.forEach(t => types.push(t.type.name))

            obj.name = response.name;
            obj.types = types;
            obj.rarity = p.rarity;
            obj.level = p.level;

            return obj;

        })

    )

    await Pokemon.insertMany(pokemon);

    console.log("Seeding Wild Pokemon completed...\n");

}

connect()
    .then(() => initialize())
    .then(() => seedUsers())
    .then(() => seedStarters())
    .then(() => seedWild())
    .then(() => mongoose.connection.close())
    .catch(err => console.log(err))