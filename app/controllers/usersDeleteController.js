const Users = require('../models/Users');

// Function to delete user profile
exports.deleteProfile = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.userId) {
            return res.status(401).json({ message: "Non autorisé. Veuillez vous connecter pour supprimer votre profil." });
        }

        // Delete user profile from database
        await Users.destroy({ where: { user_id: req.userId } });
        
        // Log out the user by deleting their session information
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        res.status(200).json({ message: "Profil supprimé avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur de serveur" });
    }
};
