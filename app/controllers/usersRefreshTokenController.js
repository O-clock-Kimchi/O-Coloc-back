const { generateAccessToken } = require('../utils/tokenService');

exports.refreshToken = async (req, res) => {
    try {
        // Check user authentication (access token)
        const userId = req.userId; // Assume that the authentication middleware has already placed the user ID in req.userId

        // Generate a new access token
        const newAccessToken = generateAccessToken(userId);

        // Reply with the new access token
        res.status(200).json({ message: "Nouvel access token généré avec succès", accessToken: newAccessToken });
    } catch (error) {
        // Error management
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la génération du nouvel access token" });
    }
}
