/* eslint-disable eol-last */
/* eslint-disable import/newline-after-import */
/* eslint-disable comma-dangle */
/* eslint-disable spaced-comment */
// userRouter.js

const express = require('express');
const session = require('express-session');
const usersRouter = express.Router();
const app = express();
// Configuration du middleware express-session pour ce routeur spécifique
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true
// }));

// Importer les contrôleurs
const { signup } = require('../controllers/usersSignupController');
const { login } = require('../controllers/usersLoginController');
const { updateProfile } = require('../controllers/usersUpdateController');
const { deleteProfile } = require('../controllers/usersDeleteController');
const { getProfile } = require('../controllers/usersGetProfile');


// Route pour l'inscription d'un nouvel utilisateur
usersRouter.post('/signup', signup);

// Route pour la connexion de l'utilisateur
usersRouter.post('/login', login);

//Route pour la mise à jour du profil d'un utilisateur connecté
usersRouter.put('/user/:userId/profile', updateProfile);

//Route pour la suppression d'un compte utilisateur (utilisateur connecté)
usersRouter.delete('/user/:userId/delete', deleteProfile);

//Route pour la consultation de la page profil par l'utilisateur
usersRouter.get('/user/:userId/profile', getProfile);


// module.exports = usersRouter;
module.exports = usersRouter;