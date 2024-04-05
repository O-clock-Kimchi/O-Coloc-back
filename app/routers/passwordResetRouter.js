/* eslint-disable max-len */
/* eslint-disable linebreak-style */
const express = require('express');
const passwordResetRouter = express.Router();
const PasswordResetController = require('../controllers/PasswordResetController');

// Route pour demander la réinitialisation du mot de passe
passwordResetRouter.post('/request-reset', PasswordResetController.requestPasswordReset);

// Route pour valider le token et afficher le formulaire de réinitialisation du mot de passe
passwordResetRouter.get('/validate-reset-token/:token', PasswordResetController.validateResetToken);

// Route pour soumettre le nouveau mot de passe
passwordResetRouter.post('/reset-password', PasswordResetController.resetPassword);

module.exports = passwordResetRouter;
