/* eslint-disable import/order */
/* eslint-disable consistent-return */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable eol-last */
const Users = require('../models/Users');
const bcrypt = require('bcrypt');

// Function for user authentication
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists in database
        const user = await Users.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ message: "L'utilisateur n'existe pas" });
        }
        // Vérifier si le mot de passe est correct
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ message: "Mot de passe incorrect" });
        }

        // Authentification réussie
        
        // Stockage de l'identifiant de l'utilisateur dans la session
        req.session.userId = user.user_id; 
        console.log("User ID in session:", req.session.userId);

        res.status(200).json({ message: "Authentification réussie", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur de serveur" });
    }
};