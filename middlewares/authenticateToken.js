/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable dot-notation */
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
// const jwt = require('jsonwebtoken');


const jwt = require('jsonwebtoken');
const Users = require('../app/models/Users');


function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log(req.headers);
    //* permet de récupérer le token dans le header, ici on n'utilise pas les cookies car pas sur le même PORT front/back.
    
    const accessToken = authHeader && authHeader.split(' ')[1]; // Extraction du token


    console.log(accessToken);
    if (!accessToken) {
        return res.status(401).json({ message: "Aucun jeton d'accès fourni. Veuillez vous connecter pour accéder à cette ressource." });
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, accessTokenDecoded) => {
        if (err) {
            return res.status(403).json({ message: "Le jeton d'accès est invalide ou a expiré. Veuillez vous reconnecter." });
        } else {
            try {
                const user = await Users.findOne({ where: { user_id: accessTokenDecoded.user_id } });
                if (!user) {
                    return res.status(404).json({ message: "Utilisateur introuvable." });
                }
                req.userId = user.user_id; // Attribuer l'ID de l'utilisateur à la requête
                next();
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Erreur de serveur lors de la recherche de l'utilisateur." });
            }
        }
    });
}

module.exports = authenticateToken;
