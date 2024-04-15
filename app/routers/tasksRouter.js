/* eslint-disable import/newline-after-import */
/* eslint-disable linebreak-style */
const express = require('express');
const tasksRouter = express.Router();
const TaskController = require('../controllers/tasksController');
const authenticateToken = require('../../middlewares/authenticateToken');
// Create a new task
tasksRouter.post('/tasks', authenticateToken, TaskController.createTask);

// Recover all tasks
tasksRouter.get('/tasks', TaskController.getAllTasks);

// Update a specific task
tasksRouter.put('/tasks/:taskId', authenticateToken, TaskController.updateTask);

// Delete a specific task
tasksRouter.delete('/tasks/:taskId', authenticateToken, TaskController.deleteTask);
module.exports = tasksRouter;
