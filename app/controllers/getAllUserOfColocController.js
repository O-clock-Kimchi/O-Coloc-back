const Colocs = require('../models/Colocs');
const Users = require('../models/Users');


exports.getAllUserOfColocController = async (req, res) => {
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
                    firstname: users.nom
                    
                }));
        
                return res.status(200).json(allUsers);
            }else{
                return res.status(404).json({ message: "Il n'y a aucun utilisateur dans cette coloc." });
            }

        }catch (error) {
            console.error("Erreur lors de la recupération des users :", error);
            return res.status(500).json({ message: "Erreur lors de la recupération des users." });
        }

}



