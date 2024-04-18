/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */
const authGoogleRouter = require('express').Router();
const passport = require('passport');

// Start authentication with Google
authGoogleRouter.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'] // Request access to the user's profile and email
}));

// The callback after Google has redirected the user
authGoogleRouter.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/'
}));

module.exports = authGoogleRouter;
