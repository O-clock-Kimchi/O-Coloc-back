const Users = require('../models/Users');
const bcrypt = require('bcrypt');

// Fonction pour mettre à jour le profil de l'utilisateur, y compris le mot de passe
exports.updateProfile = async (req, res) => {
    try {
        // Vérifier si l'utilisateur est authentifié
        if (!req.userId) {
            return res.status(401).json({ message: "Non autorisé. Veuillez vous connecter pour mettre à jour votre profil." });
        }

        const userId = req.params.userId;
        const { firstname, email, color, password } = req.body;

        // Construire l'objet des modifications
        const updates = {};
        if (firstname) updates.firstname = firstname;
        if (email) updates.email = email;
        if (color) updates.color = color;
        if (password) {
            // Vérifier si le nouveau mot de passe respecte la regex
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
            if (!passwordRegex.test(password)) {
                return res.status(400).json({ message: "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre." });
            }
            // Hasher le nouveau mot de passe
            const hashedPassword = await bcrypt.hash(password, 10);
            updates.password = hashedPassword;
        }

        // Mettre à jour le profil de l'utilisateur dans la base de données
        await Users.update(updates, { where: { user_id: userId } });

        res.status(200).json({ message: "Profil mis à jour avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur de serveur" });
    }
};
