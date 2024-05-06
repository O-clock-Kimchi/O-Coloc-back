/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */
const nodemailer = require('nodemailer');
const { getAccessToken } = require('./auth');
// Cette fonction crée un transporter nodemailer configuré
async function createTransporter() {
    const accessToken = await getAccessToken();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.EMAIL_USERNAME,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
            accessToken,
        }
    });
    return transporter;
}

module.exports = { createTransporter };
