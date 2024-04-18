/* eslint-disable import/extensions */
/* eslint-disable linebreak-style */
const express = require('express');
const session = require('express-session');
const app = express();

const router = require('./app/routers/router');

require('dotenv').config();

// Middleware to parse the request body into JSON
app.use(express.json());

// Configuring express-session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(router);

// Synchronize models with the database and start the server
app.set('port', process.env.PORT || 3000);
app.set('base_url', process.env.BASE_URL || 'http://localhost');

app.listen(app.get('port'), () => {
    console.log(`Listening on ${app.get('base_url')}:${app.get('port')}`);
});
console.log(process.env.DB_USERNAME)