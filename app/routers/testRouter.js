/* eslint-disable import/newline-after-import */
/* eslint-disable linebreak-style */
const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/tasksController');
const PasswordResetController = require('../controllers/PasswordResetController');

// Create a new task
router.post('/tasks', TaskController.createTask);

// Recover all tasks
router.get('/tasks', TaskController.getAllTasks);

// Update a specific task
router.put('/tasks/:taskId', TaskController.updateTask);

// Delete a specific task
router.delete('/tasks/:taskId', TaskController.deleteTask);

// Route pour demander la réinitialisation du mot de passe
router.post('/request-reset', PasswordResetController.requestPasswordReset);

// Route pour valider le token et afficher le formulaire de réinitialisation du mot de passe
router.get('/validate-reset-token/:token', PasswordResetController.validateResetToken);

// Route pour soumettre le nouveau mot de passe
router.post('/reset-password', PasswordResetController.resetPassword);
module.exports = router;
