/* eslint-disable linebreak-style */
const express = require('express');

const app = express();
const router = require('./app/routers/testRouter');
require('dotenv').config();

// Middleware pour parser le body des requêtes en JSON
app.use(express.json());

// Route de test pour s'assurer que l'API fonctionne
app.get('/', (_, res) => {
    res.send('Bienvenue sur Cohabit!');
});
app.use(router);

// Synchronisation des modèles avec la base de données et démarrage du serveur
app.set('port', process.env.PORT || 5000);
app.set('base_url', process.env.BASE_URL || 'http://localhost');

app.listen(app.get('port'), () => {
    console.log(`Listening on ${app.get('base_url')}:${app.get('port')}`);
});
