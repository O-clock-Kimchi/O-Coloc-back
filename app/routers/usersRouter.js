/* eslint-disable eol-last */
/* eslint-disable import/newline-after-import */
/* eslint-disable comma-dangle */
/* eslint-disable spaced-comment */
// userRouter.js

const express = require('express');
const usersRouter = express.Router();

// Importer les contrôleurs
const { signup } = require('../controllers/usersSignupController');
const { login } = require('../controllers/usersLoginController');
const { updateProfile } = require('../controllers/usersUpdateController');
const { deleteProfile } = require('../controllers/usersDeleteController');
const { getProfile } = require('../controllers/usersGetProfile');
const { logout } = require('../controllers/usersLogoutController');
const authenticateToken = require('../../middlewares/authenticateToken');
const authenticateForRefreshToken = require('../../middlewares/authenticateForRefreshToken');
const { refreshToken } = require('../controllers/usersRefreshTokenController');

// Route pour l'inscription d'un nouvel utilisateur
usersRouter.post('/signup', signup);

// Route pour la connexion de l'utilisateur
usersRouter.post('/login', login);

//Route pour la mise à jour du profil d'un utilisateur connecté
usersRouter.put('/profile', authenticateToken, updateProfile);

//Route pour la suppression d'un compte utilisateur (utilisateur connecté)
usersRouter.delete('/delete', authenticateToken, deleteProfile);

//Route pour la consultation de la page profil par l'utilisateur
usersRouter.get('/profile', authenticateToken, getProfile);

//Route pour la deconnexion du user
usersRouter.post('/logout', authenticateToken, logout);

//Route pour refresh Token
usersRouter.post('/refresh-token', authenticateToken, refreshToken);

// module.exports = usersRouter;
module.exports = usersRouter;