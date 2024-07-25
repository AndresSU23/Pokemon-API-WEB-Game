const mongoose = require('mongoose');

const connect = () => new Promise((resolve, reject) => {

    mongoose.connect(process.env.MONGO_URI, {});
    mongoose.set('debug', false);
    resolve(console.log("Mongo DB connection successful..."));

});

module.exports = connect;