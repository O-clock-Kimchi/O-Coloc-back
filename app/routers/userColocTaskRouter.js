/* eslint-disable import/newline-after-import */
const express = require('express');
const userColocTaskRouter = express.Router();
const userColocTaskController = require('../controllers/userColocTaskController');
const authenticateToken = require('../../middlewares/authenticateToken');
// Route pour recupérer une coloc et tous ses users
userColocTaskRouter.get('/colocs/:id/users', authenticateToken, userColocTaskController.getAllUserOfColocController);

// route pour recupérer toutes les tasks d'une coloc
userColocTaskRouter.get('/colocs/:id/tasks', authenticateToken, userColocTaskController.getAllTasksOfColocController);

module.exports = userColocTaskRouter;