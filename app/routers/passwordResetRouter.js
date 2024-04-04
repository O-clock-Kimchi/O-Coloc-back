/* eslint-disable max-len */
/* eslint-disable linebreak-style */
const express = require('express');
const router = express.Router();
const PasswordResetController = require('../controllers/PasswordResetController');

// Route pour demander la réinitialisation du mot de passe
router.post('/request-reset', PasswordResetController.requestPasswordReset);

// Route pour valider le token et afficher le formulaire de réinitialisation du mot de passe
router.get('/validate-reset-token/:token', PasswordResetController.validateResetToken);

// Route pour soumettre le nouveau mot de passe
router.post('/reset-password', PasswordResetController.resetPassword);

module.exports = router;
