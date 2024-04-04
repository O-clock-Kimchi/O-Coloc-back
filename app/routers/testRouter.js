/* eslint-disable linebreak-style */
const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/tasksController');

// Créer une nouvelle tâche
router.post('/tasks', TaskController.createTask);

// Récupérer toutes les tâches
router.get('/tasks', TaskController.getAllTasks);

// Mettre à jour une tâche spécifique
router.put('/tasks/:taskId', TaskController.updateTask);

// Supprimer une tâche spécifique
router.delete('/tasks/:taskId', TaskController.deleteTask);

module.exports = router;
