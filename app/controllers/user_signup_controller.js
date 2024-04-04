const Users = require('../models/Users');
const bcrypt = require('bcrypt');


// Function to create a new user
exports.signup = async (req, res) => {
    try {
        const { firstname, email, password, color } = req.body;

        // Check if the password meets the required format
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule, une lettre minuscule et un chiffre." });
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

          // Check if the color is already selected by another user
          const colorExists = await Users.findOne({ where: { color } });
          if (colorExists) {
              return res.status(400).json({ message: "La couleur choisie est déjà sélectionnée par un autre utilisateur." });
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

        //Save user in session
        req.session.userId = newUser.user_id;
        console.log("User ID in session:", req.session.userId);


        res.status(201).json({ message: "Utilisateur créé avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur de serveur" });
    }
};
