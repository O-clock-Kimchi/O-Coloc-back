/* eslint-disable comma-dangle */
/* eslint-disable no-multi-spaces */
/* eslint-disable linebreak-style */
const { google } = require('google-auth-library');

const CLIENT_ID = process.env.OAUTH_CLIENTID;
const CLIENT_SECRET = process.env.OAUTH_CLIENT_SECRET;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';  // Assurez-vous que cela correspond à l'URI de redirection configurée dans Google Cloud Console

const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

async function getAccessToken() {
    const { tokens } = await oauth2Client.getAccessToken();
    return tokens.access_token;  // retourne l'accessToken pour utilisation immédiate
}

// Utilisez le code obtenu dans l'URL de redirection pour appeler cette fonction
getAccessToken('4/0AeaYSHCRg7Sn5z8PCpx1mOCV5ih8IIsZEU-Xq--Qm8cGt-bsViep4chwTMquBAm400JJrg');

module.exports = { oauth2Client, getAccessToken };
