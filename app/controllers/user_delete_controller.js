const Users = require('../models/Users');

// Fonction pour supprimer le profil de l'utilisateur
exports.deleteProfile = async (req, res) => {
    try {
        // Vérifier si l'utilisateur est authentifié
        if (!req.session.userId) {
            return res.status(401).json({ message: "Non autorisé. Veuillez vous connecter pour supprimer votre profil." });
        }

        const userIdToDelete = req.params.userId.toString();
        console.log("User ID to delete:", userIdToDelete); // Vérifier la valeur de userIdToDelete

        const loggedInUserId = req.session.userId.toString();
        console.log("Logged in User ID:", loggedInUserId); // Vérifier la valeur de l'ID de l'utilisateur connecté

        // Vérifier si l'utilisateur à supprimer est le même que celui connecté
        if (loggedInUserId !== userIdToDelete) {
            return res.status(403).json({ message: "Non autorisé. Vous n'êtes pas autorisé à supprimer ce profil." });
        }

        // Supprimer le profil de l'utilisateur de la base de données
        await Users.destroy({ where: { user_id: userIdToDelete } });

        // Déconnecter l'utilisateur en supprimant ses informations de session
        req.session.destroy();

        res.status(200).json({ message: "Profil supprimé avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur de serveur" });
    }
};
