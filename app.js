/* eslint-disable func-names */
/* eslint-disable object-shorthand */
/* eslint-disable linebreak-style */
const express = require('express');
const passport = require('passport');
require('./config/passport-setup'); // Configuration de Passport, assurez-vous que cela utilise aussi JWT si nécessaire
const cors = require('cors');
const cookieParser = require('cookie-parser');



const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];

const app = express();


const router = require('./app/router.js');

require('dotenv').config();

// Configuration de CORS
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

// Retirer express-session et configurer JWT pour l'authentification
// Assurez-vous que Passport utilise aussi JWT si c'est nécessaire pour la stratégie
app.use(passport.initialize());

//middleware cookie-parser
app.use(cookieParser());

app.use(router);


app.set('port', process.env.PORT || 5000);
app.set('base_url', process.env.BASE_URL || 'http://localhost');

app.listen(app.get('port'), () => {
    console.log(`Listening on ${app.get('base_url')}:${app.get('port')}`);
});
