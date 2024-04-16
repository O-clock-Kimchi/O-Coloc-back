/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable dot-notation */
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) {
        return res.sendStatus(401); // Aucun token, non autorisé
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Token invalide
        }
        req.userId = user.user_id;
        req.user = Object.assign({}, user);
        delete req.user.password;
        next();
    });
}

module.exports = authenticateToken;
