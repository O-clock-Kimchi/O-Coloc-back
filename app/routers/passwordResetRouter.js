/* eslint-disable import/newline-after-import */
/* eslint-disable linebreak-style */
const express = require('express');
const passwordResetRouter = express.Router();
const PasswordResetController = require('../controllers/PasswordResetController');

// Route to request password reset
passwordResetRouter.post('/request-reset', PasswordResetController.requestPasswordReset);

// Route to validate the token and display the password reset form
passwordResetRouter.get('/validate-reset-token/:token', PasswordResetController.validateResetToken);

// Route to submit the new password
passwordResetRouter.post('/reset-password', PasswordResetController.resetPassword);

module.exports = passwordResetRouter;
