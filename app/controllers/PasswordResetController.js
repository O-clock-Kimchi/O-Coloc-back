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

// Configuration de nodemailer avec tes informations
const transporter = nodemailer.createTransport({
    service: 'gmail', // Utilise ton service d'email
    auth: {
    user: process.env.EMAIL_USERNAME, // Ton adresse email
    pass: process.env.EMAIL_PASSWORD // Ton mot de passe email ou jeton d'authentification
    }
});

const PasswordResetController = {
async requestPasswordReset(req, res) {
    const { email } = req.body;
    // Trouver l'utilisateur par email
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(404).json({ error: 'Aucun utilisateur avec cet email n\'a été trouvé.' });
    }

    // Générer un token de réinitialisation
    const resetToken = crypto.randomBytes(20).toString('hex');
    // Définir une date d'expiration du token (1 heure)
    const resetTokenExpires = new Date(Date.now() + 3600000); // 1 heure en millisecondes

    // Enregistrer le token et sa date d'expiration en base de données
    await user.update({
        reset_password_token: resetToken,
        reset_password_expires: resetTokenExpires
    });

    // Créer l'URL de réinitialisation
    const resetUrl = `http://cohabit-app/reset-password?token=${resetToken}`;

    // Envoyer l'email
    const mailOptions = {
        to: email,
        from: process.env.EMAIL_USERNAME, // Ton adresse email d'assistance
        subject: 'Oups! Mot de passe oublié?',
        text: `Salut toi, \n\n` +
            `Alors, tu as perdu ton mot de passe? Pas de panique, ça arrive même aux meilleurs colocataires! 😄\n\n` +
            `Pour remettre les choses en ordre, clique sur ce lien magique (ou copie-le dans ton navigateur) :\n\n` +
            `${resetUrl}\n\n` +
            `Si tu te demandes ce qui se passe ici et que tu n'as rien demandé, ne t'inquiète pas, c'est peut-être juste un fantôme geek qui s'amuse. Ignore simplement cet email et tout ira bien! 👻\n`
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            return res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email.' });
        }
    res.status(200).json({ message: `Un email de réinitialisation a été envoyé à ${email}.` });
    });
},

  // Méthode pour valider le token de réinitialisation
async resetPassword(req, res) {
    const { token, userId, newPassword } = req.body;
    const user = await User.findOne({
    where: {
        id: userId,
        reset_password_token: token,
        reset_password_expires: { [Sequelize.Op.gt]: Date.now() }
    }
    });

    if (!user) {
        return res.status(400).json({ error: 'Demande de réinitialisation invalide ou expirée.' });
    }

    // Hash le nouveau mot de passe ici avant de le sauvegarder
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await user.update({
        password: hashedPassword,
        reset_password_token: null, // Nettoyer le token après la réinitialisation
        reset_password_expires: null
    });

    res.status(200).json({ message: 'Mot de passe réinitialisé avec succès.' });
},

  // Méthode pour mettre à jour le mot de passe
async validateResetToken(req, res) {
    const { token } = req.params;
    const user = await User.findOne({
    where: {
        reset_password_token: token,
        reset_password_expires: { [Sequelize.Op.gt]: Date.now() } // Vérifie si le token n'est pas expiré
}
});

    if (!user) {
        return res.status(400).json({ error: 'Oups! Ce jeton de réinitialisation semble avoir fait une pause-café trop longue ou s\'est perdu en chemin.' });
    }

    // Le token est valide, procéder à la réinitialisation du mot de passe
    // Tu peux ici, par exemple, rediriger l'utilisateur vers une page de réinitialisation du mot de passe sur le frontend
    res.status(200).json({ message: 'Token valide. L\'utilisateur peut réinitialiser son mot de passe.', userId: user.id });
}

};

module.exports = PasswordResetController;
