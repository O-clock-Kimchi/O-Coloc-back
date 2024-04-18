const Tasks = require('../models/Tasks');
const Colocs = require('../models/Colocs');
const Users = require('../models/Users');

const userColocTaskController={
    // recovery of all users of a roommate
    async getAllUserOfColocController(req, res){
        try{
            if (!req.userId) {
                return res.status(401).json({ message: "Utilisateur non connecté" });
            }
            const id = req.params.id;
            const coloc = await Colocs.findByPk(id);
            
            if (!coloc) {
                return res.status(404).json({ message: "Colocation inexistante." });
            }
            
            const user = await Users.findAll({where:{current_coloc_id: coloc.coloc_id}})
            
            if(user){
                const allUsers = user.map(users => ({
                    user_id: users.user_id,
                    firstname: users.firstname,
                    color: users.color
                    
                }));
                
                return res.status(200).json(allUsers);
            }else{
                return res.status(404).json({ message: "Il n'y a aucun utilisateur dans cette coloc." });
            }
            
        }catch (error) {
            console.error("Erreur lors de la recupération des users :", error);
            return res.status(500).json({ message: "Erreur lors de la recupération des users." });
        }
    },
    // recover tasks from a roommate
    async getAllTasksOfColocController(req, res) {
        try {
            if (!req.userId) {
                return res.status(401).json({ message: "Utilisateur non connecté" });
            }
            const id = req.params.id;
            const coloc = await Colocs.findByPk(id);
            
            if (!coloc) {
                return res.status(404).json({ message: "Colocation inexistante." });
            }
            
            
            const user = await Users.findAll({ where: { current_coloc_id: coloc.coloc_id } });
            
            if (user.length === 0) {
                return res.status(404).json({ message: "Il n'y a aucun utilisateur dans cette coloc." });
            }else{ 
                const allTasks = [];
                for (const users of user) {
                    const tasks = await Tasks.findAll({ where: { user_id: users.user_id } });
                    for (const task of tasks) {
                        allTasks.push({
                            tasks_id: task.tasks_id,
                            description: task.description,
                            user_id: task.user_id,
                            due_date: task.due_date,
                            is_done: task.is_done,
                            created_at: task.created_at,
                            is_predefined: task.is_predefined,
                            frequency: task.frequency
                        });
                    } 
                } 
                return res.status(200).json(allTasks);
            }
                
            } catch (error) {
                console.error("Erreur lors de la récupération des tâches :", error);
                return res.status(500).json({ message: "Erreur lors de la récupération des tâches." });
            }
        },
        
    }
    
    module.exports = userColocTaskController;
    