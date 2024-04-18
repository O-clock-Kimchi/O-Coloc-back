const jwt = require('jsonwebtoken');


function authenticateForRefreshToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader && authHeader.split(' ')[1]; // Extraction du token

    if (!accessToken) {
        return res.status(401).json({ message: "Aucun jeton d'accès fourni. Veuillez vous connecter pour accéder à cette ressource." });
    }

    // Vérifier l'access token
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, accessTokenDecoded) => {
        if (err) {
            return res.status(403).json({ message: "Le jeton d'accès est invalide ou a expiré. Veuillez vous reconnecter." });
        } else {
            req.userId = accessTokenDecoded.user_id; // Attribuer l'ID de l'utilisateur à la requête
            next();
        }
    });
}
module.exports = authenticateForRefreshToken;
