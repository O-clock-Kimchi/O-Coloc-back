/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */
const authGoogleRouter = require('express').Router();
const passport = require('passport');

// Démarre l'authentification avec Google
authGoogleRouter.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'] // Demander l'accès au profil et à l'email de l'utilisateur
}));

// Le callback après que Google ait redirigé l'utilisateur
authGoogleRouter.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/'
}));

module.exports = authGoogleRouter;
