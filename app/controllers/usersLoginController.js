/* eslint-disable import/order */
/* eslint-disable consistent-return */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable eol-last */
const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../utils/tokenService');

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
        // Stockage de l'identifiant de l'utilisateur dans le token JWT

        // Generate JWT Token
        // const token = jwt.sign(
        //     { user_id: user.user_id },
        //     process.env.ACCESS_TOKEN_SECRET,
        //     { expiresIn: '1h' } // Configure the token to be valid for 1 hour
        //     );
            const userToSend = {
                userId: user.user_id,
                email: user.email,
                color: user.color,
                firstname: user.firstname,
                currentColocId: user.current_coloc_id,
            };

        // Fonction pour créer un nouveau refresh token
        // const generateRefreshToken = (user_id) => {
        //     return jwt.sign({ user_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '7d' });
        // };

        // Générer le Refresh Token
        // const refreshToken = generateRefreshToken(user.user_id);

        
        
        const accessToken = generateAccessToken(user.user_id);
        // Envoyer le cookie avec le JWT
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Assurez-vous que 'secure' est vrai en production
            sameSite: 'strict', // ou 'lax' selon votre besoin
            maxAge: 3600000 // 1 heure en millisecondes
        });
        
        const refreshToken = generateRefreshToken(user.user_id);
                    // Envoyer le cookie avec le Refresh Token
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 jours en millisecondes
        });

        res.status(201).json({
            message: "Utilisateur connecté avec succès",
            accessToken,
            user: userToSend,
            refreshToken,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur de serveur" });
    }
};