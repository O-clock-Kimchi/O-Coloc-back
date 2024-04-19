const { generateAccessToken } = require('../utils/tokenService');
const jwt = require('jsonwebtoken');

exports.refreshToken = async (req, res) => {
    try {
        // Vérifier l'authentification de l'utilisateur (access token)
        const userId = req.userId; // Supposons que le middleware d'authentification a déjà placé l'ID de l'utilisateur dans req.userId

        // Générer un nouveau access token
        const newAccessToken = generateAccessToken(userId);

        // Répondre avec le nouvel access token
        res.status(200).json({ message: "Nouvel access token généré avec succès", accessToken: newAccessToken });
    } catch (error) {
        // Gestion des erreurs
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la génération du nouvel access token" });
    }
}
