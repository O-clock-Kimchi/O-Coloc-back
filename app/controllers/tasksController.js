/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
/* eslint-disable comma-dangle */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
const dayjs = require('dayjs');
const Task = require('../models/Tasks');

const TaskController = {
  // Crée une nouvelle tâche
  async createTask(req, res) {
    const { description, is_predefined, is_done, frequency, user_id } = req.body;
    let dueDate = dayjs();

    // Détermine la due_date basée sur la fréquence
    if (frequency === 1) {
        dueDate = dueDate.add(1, 'day');
    } else if (frequency === 7) {
        dueDate = dueDate.add(1, 'week');
    } else if (frequency === 30) {
        dueDate = dueDate.add(1, 'month');
    } else {
        dueDate = dueDate.add(frequency, 'day');
    }

    try {
      const task = await Task.create({
        description,
        is_predefined,
        is_done,
        frequency,
        due_date: dueDate.toDate(),
        user_id
      });
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Récupère toutes les tâches
  async getAllTasks(_, res) {
    try {
      const tasks = await Task.findAll();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Met à jour une tâche spécifique
  async updateTask(req, res) {
    const { taskId } = req.params;
    const { description, is_predefined, is_done, frequency, user_id } = req.body;

    try {
      const task = await Task.findByPk(taskId);
      if (!task) {
        return res.status(404).json({ error: 'Tâche non trouvée' });
      }

      let dueDate = dayjs(task.created_at);

      if (frequency === 1) {
        dueDate = dueDate.add(1, 'day');
      } else if (frequency === 7) {
        dueDate = dueDate.add(1, 'week');
      } else if (frequency === 30) {
        dueDate = dueDate.add(1, 'month');
      } else {
        dueDate = dueDate.add(frequency, 'day');
      }

      await Task.update({
        description,
        is_predefined,
        is_done,
        frequency,
        due_date: dueDate.toDate(),
        user_id
      }, {
        where: { tasks_id: taskId }
      });

      res.status(200).json({ message: 'Tâche mise à jour avec succès' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Supprime une tâche spécifique
  async deleteTask(req, res) {
    const { taskId } = req.params;

    try {
      const task = await Task.findByPk(taskId);
      if (!task) {
        return res.status(404).json({ error: 'Tâche non trouvée' });
      }

      await Task.destroy({
        where: { tasks_id: taskId }
      });

      res.status(200).json({ message: 'Tâche supprimée avec succès' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
};

module.exports = TaskController;
