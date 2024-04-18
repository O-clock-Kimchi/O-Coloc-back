/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable padded-blocks */
/* eslint-disable eol-last */
/* eslint-disable keyword-spacing */
const Users= require('../models/Users');
const jwt = require('jsonwebtoken');

// Déconnexion de l'utilisateur
exports.logout = (req, res) => {
    try {
        // Supprimer le cookie contenant le token JWT
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        // Répondre avec un message de succès
        res.status(200).json({ message: 'Déconnexion réussie avec succès' });
    } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
        res.status(500).json({ message: 'Erreur lors de la déconnexion' });
    }
};

