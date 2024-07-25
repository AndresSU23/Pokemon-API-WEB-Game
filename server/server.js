require('dotenv').config();

const express = require('express');
const cors = require('cors');
const passport = require('passport');

const { strategy } = require('./utils/auth');

const connect = require('./config/connection');

const app = express();

app.use(cors());
passport.use(strategy);
app.use(passport.initialize())

app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.use('/api', require('./routes'));

const PORT = process.env.PORT;

connect()
    .then(() => app.listen(PORT, () => { console.log(`App listening at port: ${PORT}`) }))
    .catch(err => console.log(err))