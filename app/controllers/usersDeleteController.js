const Users = require('../models/Users');

// Fonction pour supprimer le profil de l'utilisateur
exports.deleteProfile = async (req, res) => {
    try {
        // Vérifier si l'utilisateur est authentifié
        if (!req.userId) {
            return res.status(401).json({ message: "Non autorisé. Veuillez vous connecter pour supprimer votre profil." });
        }

        // Supprimer le profil de l'utilisateur de la base de données
        await Users.destroy({ where: { user_id: req.userId } });
        
        // Déconnecter l'utilisateur en supprimant ses informations de session
        res.clearCookie('jwt');

        res.status(200).json({ message: "Profil supprimé avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur de serveur" });
    }
};
