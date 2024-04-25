/* eslint-disable consistent-return */
/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable prefer-destructuring */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { Sequelize } = require('sequelize');

const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
    const oauth2Client = new OAuth2(
        process.env.OAUTH_CLIENTID,
        process.env.OAUTH_CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
        refresh_token: process.env.OAUTH_REFRESH_TOKEN,
    });

    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err) {
                console.error('Erreur lors de la génération du token:', err);
                reject(new Error('Erreur lors de la génération du token d’accès.'));
            }
            resolve(token);
        });
    });

    return nodemailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL_USERNAME,
            accessToken,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        },
    });
};

const PasswordResetController = {
    async requestPasswordReset(req, res) {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'Aucun utilisateur avec cet email n\'a été trouvé.' });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpires = new Date(Date.now() + 3600000);

        await user.update({
            reset_password_token: resetToken,
            reset_password_expires: resetTokenExpires
        });

        const resetUrl = `http://cohabit-app/reset-password?token=${resetToken}`;

        try {
            let emailTransporter = await createTransporter();
            const mailOptions = {
                from: process.env.EMAIL_USERNAME,
                to: email,
                subject: 'Oups! Mot de passe oublié?',
                text: `Salut toi, \n\n` +
                `Alors, tu as perdu ton mot de passe? Pas de panique, ça arrive même aux meilleurs colocataires! 😄\n\n` +
                `Pour remettre les choses en ordre, clique sur ce lien magique (ou copie-le dans ton navigateur) :\n\n` +
                `${resetUrl}\n\n` +
                `Si tu te demandes ce qui se passe ici et que tu n'as rien demandé, ne t'inquiète pas, c'est peut-être juste un fantôme geek qui s'amuse. Ignore simplement cet email et tout ira bien! 👻\n`
            };

            await emailTransporter.sendMail(mailOptions);
            res.status(200).json({ message: `Un lien de réinitialisation de mot de passe a été envoyé à ${email}.` });
        } catch (error) {
            console.error('Erreur lors de l\'envoi de l\'email:', error);
            return res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email.', details: error.toString() });
        }
    },

    async resetPassword(req, res) {
        const { token, newPassword } = req.body;
        const user = await User.findOne({
            where: {
                reset_password_token: token,
                reset_password_expires: { [Sequelize.Op.gt]: Date.now() }
            }
        });

        if (!user) {
            return res.status(400).json({ error: 'Demande de réinitialisation invalide ou expirée.' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await user.update({
            password: hashedPassword,
            reset_password_token: null,
            reset_password_expires: null
        });

        res.status(200).json({ message: 'Mot de passe réinitialisé avec succès.' });
    },

    async validateResetToken(req, res) {
        const { token } = req.params;
        const user = await User.findOne({
            where: {
                reset_password_token: token,
                reset_password_expires: { [Sequelize.Op.gt]: Date.now() }
            }
        });

        if (!user) {
            return res.status(400).json({ error: 'Oups! Ce jeton de réinitialisation semble avoir fait une pause-café trop longue ou s\'est perdu en chemin.' });
        }

        // Ajoutez la logique que vous souhaitez effectuer si le token est valide
        res.status(200).json({ message: 'Token valide. L\'utilisateur peut réinitialiser son mot de passe.', userId: user.id });
    }
};

module.exports = PasswordResetController;
