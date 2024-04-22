/* eslint-disable padded-blocks */
/* eslint-disable no-else-return */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-undef */
/* eslint-disable comma-dangle */
/* eslint-disable consistent-return */
/* eslint-disable operator-linebreak */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/Users');
require('dotenv').config();
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

// Configure nodemailer with your information
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USERNAME,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: "ya29.a0Ad52N3_NTroTZgoPKClY1Ei7VQXTonzZSMyh2p6RmzFOSrrFyw6UzsunPHc-ErXgHDqCMI1NvqzMglF7yrUDxIEVdDlEQfqa0lqeq9rDCStWuWVECkr0MYnbAIpMwvEIwEGw7ovDbKpUmB8sUh6oxG3mqNy0rVK2hJERaCgYKARgSARISFQHGX2MiPQ3sh9Z_fFe4c5NDp8uvCQ0171"
    }
});

const PasswordResetController = {
    async requestPasswordReset(req, res) {
        const { email } = req.body;
        // Find the user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'Aucun utilisateur avec cet email n\'a été trouvé.' });
        }
        
        // Generate a reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        // Set a token expiration date (1 hour)
        const resetTokenExpires = new Date(Date.now() + 3600000); 
        
        // Save the token and its expiration date in the database
        await user.update({
            reset_password_token: resetToken,
            reset_password_expires: resetTokenExpires
        });
        
        // Create the reset URL
        const resetUrl = `http://cohabit-app/reset-password?token=${resetToken}`;
        
        // Send email
        const mailOptions = {
            to: email,
            from: process.env.EMAIL_USERNAME, 
            subject: 'Oups! Mot de passe oublié?',
            text: `Salut toi, \n\n` +
            `Alors, tu as perdu ton mot de passe? Pas de panique, ça arrive même aux meilleurs colocataires! 😄\n\n` +
            `Pour remettre les choses en ordre, clique sur ce lien magique (ou copie-le dans ton navigateur) :\n\n` +
            `${resetUrl}\n\n` +
            `Si tu te demandes ce qui se passe ici et que tu n'as rien demandé, ne t'inquiète pas, c'est peut-être juste un fantôme geek qui s'amuse. Ignore simplement cet email et tout ira bien! 👻\n`
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Erreur lors de l\'envoi de l\'email:', error);
                return res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email.', details: error.toString() });
            } else {
                console.log('Email envoyé:', info.response);
                return res.status(200).json({ message: `Un email de réinitialisation a été envoyé à ${email}.` });
            }
        });
    },
    
    // Method to validate the reset token
    async resetPassword(req, res) {
        try {
            const { token, userId, newPassword } = req.body;
            const user = await User.findOne({
                where: {
                    user_id: userId,
                    reset_password_token: token,
                    reset_password_expires: { [Sequelize.Op.gt]: Date.now() }
                }
            });
            
            if (!user) {
                return res.status(400).json({ error: 'Demande de réinitialisation invalide ou expirée.' });
            }
            
            // Hash the new password here before saving it
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            
            await user.update({
                password: hashedPassword,
                reset_password_token: null, 
                reset_password_expires: null
            });
            
            res.status(200).json({ message: 'Mot de passe réinitialisé avec succès.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur de serveur" });
        }
    },
    
    // Method to update password
    async validateResetToken(req, res) {
        try {
            const { token } = req.params;
            const user = await User.findOne({
                where: {
                    reset_password_token: token,
                    reset_password_expires: { [Sequelize.Op.gt]: Date.now() } 
                }});
                
                if (!user) {
                    return res.status(400).json({ error: 'Oups! Ce jeton de réinitialisation semble avoir fait une pause-café trop longue ou s\'est perdu en chemin.' });
                }
                
                res.status(200).json({ message: 'Token valide. L\'utilisateur peut réinitialiser son mot de passe.', userId: user.id });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erreur de serveur" });
        }
            
    }
};
    
    module.exports = PasswordResetController;
