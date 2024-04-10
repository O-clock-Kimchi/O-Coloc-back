/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../app/models/Users.js');

passport.use(new GoogleStrategy(
    {
    clientID: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    callbackURL: `${process.env.BASE_URL}:${process.env.PORT}/auth/google/callback`
},
async (accessToken, refreshToken, profile, done) => {
    try {
        // Recherchez l'utilisateur dans votre base de données
        let user = await User.findOne({ where: { google_id: profile.id } });

    if (user) {
        // Si l'utilisateur existe déjà, vous pouvez choisir de mettre à jour son refreshToken
        await user.update({ refreshToken });
    } else {
        // Si l'utilisateur n'existe pas, créez un nouveau record utilisateur
        user = await User.create({
            google_id: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            profile_image_url: profile.photos[0].value,
            accessToken, // Stockez le accessToken si nécessaire pour votre application
            refreshToken // Stockez le refreshToken pour une utilisation ultérieure
        });
    }

        return done(null, user); // L'utilisateur est passé au serializer de Passport
    } catch (error) {
        return done(error);
    }
    }
));

passport.serializeUser((user, done) => {
  done(null, user.id); // Serialise l'utilisateur par son ID
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findByPk(id);
    done(null, user);
});
