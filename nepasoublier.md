<!-- Code pour calcul de frequency -->
const moment = require('moment'); // npm install moment si tu n'as pas déjà cette librairie

// Exemple de données de la tâche
const taskCreatedAt = moment(task.created_at); // Supposons que c'est la date de création de la tâche
const frequencyInDays = task.frequency; // L'intervalle en jours, par exemple 7

// Calcul de la due_date
const dueDate = taskCreatedAt.add(frequencyInDays, 'days');