/* eslint-disable import/newline-after-import */
const express = require('express');
const userColocTaskRouter = express.Router();
const userColocTaskController = require('../controllers/userColocTaskController');
const authenticateToken = require('../../middlewares/authenticateToken');

// Route to recover a roommate and all its users
userColocTaskRouter.get('/colocs/:id/users', authenticateToken, userColocTaskController.getAllUserOfColocController);

// route to recover all the tasks of a roommate
userColocTaskRouter.get('/colocs/:id/tasks', authenticateToken, userColocTaskController.getAllTasksOfColocController);

module.exports = userColocTaskRouter;
