// controllers/TaskController.js
const Task = require('../models/Task');

const TaskController = {
    // Créer une nouvelle tâche
    async createTask(req, res) {
        try {
            const task = await Task.create({
                description: req.body.description,
                created_at: new Date(),
                is_predefined: req.body.is_predefined,
                is_done: req.body.is_done,
                frequency: req.body.frequency,
                due_date: req.body.due_date,
                user_id: req.body.user_id,
            });
            res.status(201).json(task);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Récupérer toutes les tâches
    async getAllTasks(req, res) {
        try {
            const tasks = await Task.findAll();
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Mettre à jour une tâche
    async updateTask(req, res) {
        try {
            const taskId = req.params.id;
            const updatedTask = await Task.update(req.body, {
                where: { tasks_id: taskId },
            });
            res.status(200).json(updatedTask);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    // Marquer une tâche comme terminée
    async completeTask(req, res) {
        try {
            const taskId = req.params.id;
            await Task.update({ is_done: true }, {
                where: { tasks_id: taskId },
            });
            res.status(200).json({ message: 'Tâche marquée comme terminée' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Supprimer une tâche
    async deleteTask(req, res) {
        try {
            const taskId = req.params.id;
            await Task.destroy({
                where: { tasks_id: taskId },
            });
            res.status(200).json({ message: 'Tâche supprimée' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = TaskController;
