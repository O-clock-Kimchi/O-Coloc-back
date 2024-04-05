/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */
const express = require('express');
const session = require('express-session');
const cors = require('cors');

const app = express();
// const router = require('./app/routers/testRouter');
const router = require('./app/routers/router');
// const router= require('./app/colocRouter');
require('dotenv').config();

// Configuration de CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Méthodes HTTP autorisées
    allowedHeaders: ['Content-Type', 'Authorization'], // En-têtes autorisés
}));

// Middleware pour parser le body des requêtes en JSON
app.use(express.json());

// Middleware pour analyser les données de formulaire URL-encoded
app.use(express.urlencoded({ extended: true }));

// Route de test pour s'assurer que l'API fonctionne
app.get('/', (_, res) => {
    res.send('Bienvenue sur Cohabit!');
});

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
