/* eslint-disable consistent-return */
/* eslint-disable quotes */
/* eslint-disable prefer-destructuring */
/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
const Users = require('../models/Users');

// Function to access the user profile
exports.getProfile = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.userId) {
            return res.status(401).json({ message: "Non autorisé. Veuillez vous connecter pour accéder à votre profil." });
        }

        const userId = req.userId; // Get user ID from session

        // Retrieve user information from database
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