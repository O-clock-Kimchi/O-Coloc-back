/* eslint-disable import/newline-after-import */
/* eslint-disable linebreak-style */
const express = require('express');
const tasksRouter = express.Router();
const TaskController = require('../controllers/tasksController');

// Create a new task
tasksRouter.post('/tasks', TaskController.createTask);

// Recover all tasks
tasksRouter.get('/tasks', TaskController.getAllTasks);

// Update a specific task
tasksRouter.put('/tasks/:taskId', TaskController.updateTask);

// Delete a specific task
tasksRouter.delete('/tasks/:taskId', TaskController.deleteTask);
module.exports =tasksRouter;
