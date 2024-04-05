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
const { signup } = require('../controllers/user_signup_controller');
const { login } = require('../controllers/user_login_controller');
const { updateProfile } = require('../controllers/user_update_controller');
const { deleteProfile } = require('../controllers/user_delete_controller');

// Route pour l'inscription d'un nouvel utilisateur
usersRouter.post('/signup', signup);

// Route pour la connexion de l'utilisateur
usersRouter.post('/login', login);

//Route pour la mise à jour du profil d'un utilisateur connecté
usersRouter.put('/user/:userId/profile', updateProfile);

//Route pour la suppression d'un compte utilisateur (utilisateur connecté)
usersRouter.delete('/user/:userId/delete', deleteProfile);

// module.exports = usersRouter;
module.exports = usersRouter;