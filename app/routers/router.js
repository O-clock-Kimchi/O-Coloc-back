// userRouter.js

const express = require('express');
const session = require('express-session');
const router = express.Router();

// Configuration du middleware express-session pour ce routeur spécifique
router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// Importer les contrôleurs
const { signup } = require('../controllers/user_signup_controller');
const { login } = require('../controllers/user_login_controller');
const { updateProfile } = require('../controllers/user_update_controller');
const { deleteProfile } = require('../controllers/user_delete_controller');

// Route pour l'inscription d'un nouvel utilisateur
router.post('/signup', signup);

// Route pour la connexion de l'utilisateur
router.post('/login', login) 

//Route pour la mise à jour du profil d'un utilisateur connecté
router.put('/user/:userId/profile', updateProfile);

//Route pour la suppression d'un compte utilisateur (utilisateur connecté)
router.delete('/user/:userId/delete', deleteProfile);

module.exports = router;