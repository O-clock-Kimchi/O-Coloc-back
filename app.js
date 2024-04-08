/* eslint-disable func-names */
/* eslint-disable object-shorthand */
/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */
const express = require('express');
const session = require('express-session');
const cors = require('cors');

const allowedOrigins = ['htpp://localhost:5173/', 'htpp://localhost:5174/'];

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
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Méthodes HTTP autorisées
    allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
    credentials: true, // Autorise l'envoi des cookies
}));

// Middleware pour parser le body des requêtes en JSON
app.use(express.json());

// Middleware pour analyser les données de formulaire URL-encoded
app.use(express.urlencoded({ extended: true }));

// Configuration du middleware express-session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

app.use(router);

// Synchronisation des modèles avec la base de données et démarrage du serveur
app.set('port', process.env.PORT || 5000);
app.set('base_url', process.env.BASE_URL || 'http://localhost');

app.listen(app.get('port'), () => {
    console.log(`Listening on ${app.get('base_url')}:${app.get('port')}`);
});
