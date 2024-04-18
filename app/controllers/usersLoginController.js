/* eslint-disable import/order */
/* eslint-disable consistent-return */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable eol-last */
const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../utils/tokenService');

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
        

            const userToSend = {
                userId: user.user_id,
                email: user.email,
                color: user.color,
                firstname: user.firstname,
                currentColocId: user.current_coloc_id,
            };

        
        const accessToken = generateAccessToken(user.user_id);
        // Envoyer le cookie avec le JWT
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Assurez-vous que 'secure' est vrai en production
            sameSite: 'strict', // ou 'lax' selon votre besoin
            maxAge: 3600000 // 1 heure en millisecondes
        });
        

        res.status(201).json({
            message: "Utilisateur connecté avec succès",
            accessToken,
            user: userToSend

        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur de serveur" });
    }
};