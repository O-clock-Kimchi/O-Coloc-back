/* eslint-disable linebreak-style */
const express = require('express');

const app = express();

// Middlewares
app.use(express.json()); // to parse the JSON

// Routers
app.get('/', (req, res) => {
    res.send('Bienvenue sur Cohabit');
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Le serveur est fonctionnel sur le port ${PORT}`);
});
