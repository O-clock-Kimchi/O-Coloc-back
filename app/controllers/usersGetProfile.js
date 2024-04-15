/* eslint-disable consistent-return */
/* eslint-disable quotes */
/* eslint-disable prefer-destructuring */
/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
const Users = require('../models/Users');

// Fonction pour accéder au profil de l'utilisateur
exports.getProfile = async (req, res) => {
    try {
        // Vérifier si l'utilisateur est authentifié
        if (!req.userId) {
            return res.status(401).json({ message: "Non autorisé. Veuillez vous connecter pour accéder à votre profil." });
        }

        const userId = req.userId; // Récupérer l'ID de l'utilisateur à partir de la session

        // Récupérer les informations de l'utilisateur à partir de la base de données
        const user = await Users.findByPk(userId, { attributes: { exclude: ['password'] } });

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur de serveur" });
    }
};