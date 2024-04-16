/* eslint-disable object-curly-newline */
/* eslint-disable consistent-return */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
const Users = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Function to create a new user
exports.signup = async (req, res) => {
    try {
        const { firstname, email, password, color } = req.body;

        // Check if the password meets the required format

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial parmi !@#$%^&*." });
        }

        // Check if the email format is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Le format de l'adresse e-mail n'est pas valide." });
        }

        // Check if the email is already registered
        const emailExists = await Users.findOne({ where: { email } });
        if (emailExists) {
            return res.status(400).json({ message: "L'adresse e-mail est déjà enregistrée." });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await Users.create({
            firstname,
            email,
            password: hashedPassword,
            color
        });

        // Generate JWT Token
        const token = jwt.sign(
            { user_id: newUser.user_id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' } // Configure the token to be valid for 1 hour
        );
            // Envoyer le cookie avec le JWT
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Assurez-vous que 'secure' est vrai en production
            sameSite: 'strict', // ou 'lax' selon votre besoin
            maxAge: 3600000 // 1 heure en millisecondes
        });
        res.status(201).json({ message: "Utilisateur créé avec succès", token, user: req.user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur de serveur" });
    }
};
