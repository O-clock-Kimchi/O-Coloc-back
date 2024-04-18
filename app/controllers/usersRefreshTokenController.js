const { generateRefreshToken } = require('../utils/tokenService');
const jwt = require('jsonwebtoken');

exports.refreshToken = async (req, res) => {
    try {
        // Vérifier l'authentification de l'utilisateur (access token)
        const userId = req.userId; // Supposons que le middleware d'authentification a déjà placé l'ID de l'utilisateur dans req.userId

        // Générer le refresh token
        const refreshToken = generateRefreshToken(userId);

        // Envoyer le refresh token au client
        res.cookie('refreshToken', refreshToken, {
            // Options de cookie
        });

        // Répondre avec un message de succès
        res.status(200).json({ message: "Refresh token généré avec succès",
        refreshToken });
    } catch (error) {
        // Gestion des erreurs
    }
};
