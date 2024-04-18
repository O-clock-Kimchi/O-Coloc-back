/* eslint-disable object-curly-newline */
/* eslint-disable camelcase */
/* eslint-disable comma-dangle */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
const dayjs = require('dayjs');
const Task = require('../models/Tasks');
const Users = require('../models/Users');

const TaskController = {
  // Create a new task
  async createTask(req, res) {
    if (!req.userId) {
      return res.status(401).json({ message: "Non autorisé. Veuillez vous connecter pour créer une nouvelle tache." });
    }
    const user = await Users.findOne({where:{user_id:req.userId}});
    
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
    const { description, is_predefined, is_done, frequency, user_id } = req.body;
    let dueDate = dayjs();
    
    // Determine the due_date based on frequency
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
        is_done,
        frequency,
        due_date: dueDate.toDate(),
        user_id
      });
      const newTask = {
        tasks_id: task.tasks_id,
        description: task.description,
        is_done: task.is_done,
        frequency: task.frequency,
        created_at: task.created_at,
        due_date: task.due_date,
        user_id: task.user_id
      };
      res.status(201).json({ message: 'La tâche a bien été créée', task: newTask });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  
  // Get all tasks
  async getAllTasks(_, res) {
    try {
      const tasks = await Task.findAll();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  // Updates a specific task
  async updateTask(req, res) {
    if (!req.userId) {
      return res.status(401).json({ message: "Non autorisé. Veuillez vous connecter pour mettre à jour une nouvelle tache." });
    }
    const user = await Users.findOne({where:{user_id:req.userId}});
    
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
    const { taskId } = req.params;
    const { description, is_predefined, is_done, frequency, user_id } = req.body;
    
    try {
      const task = await Task.findByPk(taskId);
      if (!task) {
        return res.status(404).json({ error: 'Tâche non trouvée' });
      }
      
      let dueDate = dayjs(task.created_at);
      
      // Determine the due_date based on frequency
      if (frequency === 1) {
        dueDate = dueDate.add(1, 'day');
      } else if (frequency === 7) {
        dueDate = dueDate.add(1, 'week');
      } else if (frequency === 30) {
        dueDate = dueDate.add(1, 'month');
      } else {
        dueDate = dueDate.add(frequency, 'day');
      }
      const creatorUser = await Users.findByPk(task.user_id);
      
      if (req.userId === task.user_id || user.current_coloc_id === creatorUser.current_coloc_id) {
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
        const updatedTask = await Task.findByPk(taskId);
        res.status(200).json({ message: 'Tâche mise à jour avec succès', updatedTask });
      } else {
        res.status(404).json({ message: 'Cette tache existe peut-être mais ce n\'est pas la tienne !' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  // Delete a specific task
  async deleteTask(req, res) {
    const { taskId } = req.params;
    
    if (!req.userId) {
      return res.status(401).json({ message: "Non autorisé. Veuillez vous connecter pour supprimer une tache." });
    }
    const user = await Users.findOne({ where:{user_id:req.userId }});
    
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }
    try {
      const task = await Task.findByPk(taskId);
      if (!task) {
        return res.status(404).json({ error: 'Tâche non trouvée' });
      }
      const creatorUser = await Users.findByPk(task.user_id);
      if (req.userId === task.user_id || creatorUser.current_coloc_id === user.current_coloc_id ) {
        await Task.destroy({
          where: { tasks_id: taskId }
        });
        res.status(200).json({ message: 'Tâche supprimée avec succès' });
      } else {
        res.status(500).json({ error: 'Ce n\'est pas votre tache' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
};

module.exports = TaskController;
