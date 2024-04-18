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
        // Find the user in your database
        let user = await User.findOne({ where: { google_id: profile.id } });

    if (user) {
        // If the user already exists, you can choose to update their refreshToken
        await user.update({ refreshToken });
    } else {
        // If the user does not exist, create a new user record
        user = await User.create({
            google_id: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            profile_image_url: profile.photos[0].value,
            accessToken, // Store the accessToken if necessary for your application
            refreshToken // Store the refreshToken for later use
        });
    }

        return done(null, user); // The user is switched to the Passport serializer
    } catch (error) {
        return done(error);
    }
    }
));

passport.serializeUser((user, done) => {
  done(null, user.id); 
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findByPk(id);
    done(null, user);
});
