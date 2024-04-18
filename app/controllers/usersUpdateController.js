const Users = require('../models/Users');
const bcrypt = require('bcrypt');

// Function to update user profile including password
exports.updateProfile = async (req, res) => {
    try {
        // Check if the user is authenticated
        if (!req.userId) {
            return res.status(401).json({ message: "Non autorisé. Veuillez vous connecter pour mettre à jour votre profil." });
        }

        const { firstname, email, color, password } = req.body;

       // Construct the changes object
        const updates = {};
        if (firstname) updates.firstname = firstname;
        if (email) updates.email = email;
        if (color) updates.color = color;
        if (password) {
            // Check if the new password respects the regex
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
            if (!passwordRegex.test(password)) {
                return res.status(400).json({ message: "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre." });
            }
            // Hash the new password
            const hashedPassword = await bcrypt.hash(password, 10);
            updates.password = hashedPassword;
        }

        // Update user profile in database
        await Users.update(updates, { where: { user_id: req.userId } });

        res.status(200).json({ message: "Profil mis à jour avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur de serveur" });
    }
};
