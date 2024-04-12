const express = require('express');
const userColocTaskRouter = express.Router();
const userColocTaskController = require('../controllers/userColocTaskController');

// Route pour recupérer une coloc et tous ses users
userColocTaskRouter.get('/colocs/:id/users', userColocTaskController.getAllUserOfColocController);

// route pour recupérer toutes les tasks d'une coloc
userColocTaskRouter.get('/colocs/:id/tasks', userColocTaskController.getAllTasksOfColocController);


module.exports =userColocTaskRouter;