const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateAccessToken(user_id) {
    return jwt.sign({ user_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
}


module.exports = { generateAccessToken };
