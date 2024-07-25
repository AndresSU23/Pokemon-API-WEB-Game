const fs = require('fs');
const mongoose = require('mongoose');
const connect = require('../config/connection');
const { User } = require('../models');

require('dotenv').config();

const bcrypt = require('bcrypt');
const SALT_FACTOR = 10;

let users;

const initialize = () => new Promise((resolve, reject) => { 

    fs.readFile('./data/users.json', 'utf-8', (err, data) => {

        if (!err) users = JSON.parse(data);
        else { reject("Failed to read users.json file..."); return };

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

connect()
    .then(() => initialize())
    .then(() => seedUsers())
    .then(() => mongoose.connection.close())
    .catch(err => console.log(err))