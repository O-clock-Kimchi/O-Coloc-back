const Tasks = require('../models/Tasks');
const Colocs = require('../models/Colocs');
const Users = require('../models/Users');

const userColocTaskController={
    // recupération de tous les users dune coloc
    async getAllUserOfColocController(req, res){
        try{
            if (!req.session.userId) {
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
                    firstname: users.firstname
                    
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
    // recupération les tasks d'une coloc
    async getAllTasksOfColocController(req, res) {
        try {
            if (!req.session.userId) {
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
                            task_id: task.task_id,
                            description: task.description,
                            user_id: task.user_id,
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
    