/* eslint-disable func-names */
/* eslint-disable object-shorthand */
/* eslint-disable linebreak-style */
const express = require('express');
const passport = require('passport');
require('./config/passport-setup'); // Configure Passport, make sure this also uses JWT if necessary
const cors = require('cors');

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

const app = express();
const router = require('./app/router.js');

require('dotenv').config();

// Configuring CORS
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'L\'origine de cette requête n\'est pas autorisée.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Remove express-session and configure JWT for authentication
// Make sure Passport also uses JWT if it's necessary for the policy
app.use(passport.initialize());

app.use(router);

app.set('port', process.env.PORT || 5000);
app.set('base_url', process.env.BASE_URL || 'http://localhost');

app.listen(app.get('port'), () => {
    console.log(`Listening on ${app.get('base_url')}:${app.get('port')}`);
});
