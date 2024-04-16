/* eslint-disable consistent-return */
/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable quotes */
/* eslint-disable space-before-blocks */
/* eslint-disable no-console */
/* eslint-disable keyword-spacing */
/* eslint-disable max-len */
/* eslint-disable object-curly-spacing */
/* eslint-disable camelcase */
/* eslint-disable eol-last */
/* eslint-disable comma-dangle */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-trailing-spaces */
const Colocs = require('../models/Colocs');
const Users = require('../models/Users');
const { isValidName, isValidNameRegex, generateCodeOnUserLeave } = require('../utils/fonctions.js');

const colocController = {
    
    // Reclaim our coloc
    async show(req, res) {
        try {
            if (!req.userId) {
                return res.status(401).json({ message: "Non autorisé. Veuillez vous connecter pour recupérer votre coloc." });
            }
            const user = await Users.findOne({where:{user_id:req.userId}});
            
            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé." });
            }

            const id = req.params.id;

            const coloc = await Colocs.findByPk(id);

            if (!coloc) {
                return res.status(404).json({ message: "Colocation non trouvée." });
            }

            const colocId = user.current_coloc_id;
            console.log('Identifiant de la colocation:', coloc.coloc_id);
            console.log('Identifiant de la colocation associée à l\'utilisateur:', colocId);

            if (coloc.coloc_id === colocId) {
                res.json(coloc);
            } else {
                res.status(404).json({ message: 'Cette colocation existe peut-être mais ce n\'est pas la tienne !' });
            }
        } catch (error) {
            console.error('Erreur lors de la récupération de la colocation :', error);
            res.status(500).json({ message: 'Erreur lors de la récupération de la colocation' });
        }
    },

    // Change coloc name
    async update(req, res) {
        try {
            const id = req.params.id;
            const name = req.body.name;
            
            const coloc = await Colocs.findByPk(id);
            if (!isValidName(name)) {
                return res.status(400).json({ message: "Le nom de la colocation doit faire au minimum 4 caractères." });
            }
            if (isValidNameRegex(name)) {
                return res.status(400).json({ message: "Le nom de la colocation contient des mots interdits." });
            }
            if (coloc) {
                await coloc.update({ name });
                res.json({ message: 'Nom de la colocation mis à jour avec succès' });
            } else {
                res.status(404).json({ message: 'Colocation non trouvée' });
            }
        } catch (error) {
            console.error('Erreur lors de la modification du nom de la colocation :', error);
            res.status(500).json({ message: 'Erreur lors de la modification du nom de la colocation' });
        }
    },

    // Delete coloc
    async destroy(req, res) {
        try {
            const id = req.params.id;
            const coloc = await Colocs.findByPk(id);
            if (coloc) {
                await coloc.destroy();
                res.json({ message: 'Colocation supprimée avec succès' });
            } else {
                res.status(404).json({ message: 'Colocation non trouvée' });
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de la colocation :', error);
            res.status(500).json({ message: 'Erreur lors de la suppression de la colocation' });
        }
    },

    // Create new coloc
    async create(req, res) {
        try {
            const { name } = req.body;
            if (!req.userId) {
                return res.status(401).json({ message: "Non autorisé. Veuillez vous connecter pour créer une coloc." });
            }
            if (!isValidName(name)) {
                return res.status(400).json({ message: "Le nom de la colocation doit faire au minimum 4 caractères." });
            }
            if (isValidNameRegex(name)) {
                return res.status(400).json({ message: "Le nom de la colocation contient des mots interdits." });
            }
            const code = Math.floor(10000000 + Math.random() * 90000000).toString().substring(0, 8);

            const user = await Users.findByPk(req.userId);
            if (user.current_coloc_id){
                return res.status(400).json({ message: "Vous êtes déjà membre d'une coloc!" });
            }

            const newColoc = await Colocs.create({ 
                name, user_id: req.userId, lien_coloc: code, groupe_code_valid:code
            });
            res.status(201).json(newColoc);

            await Users.update({current_coloc_id: newColoc.coloc_id}, {where:{user_id:req.userId}});
                        
        } catch (error) {
            console.error('Erreur lors de la création de la colocation :', error);
            res.status(500).json({ message: 'Erreur lors de la création de la colocation' });
        }
    },

    // Check the code and access the coloc
    async join(req, res) {
        try {
            const { groupe_code_valid } = req.body;
            const coloc = await Colocs.findOne({ where: { groupe_code_valid } });
            
            if (!req.userId) {
                return res.status(401).json({ message: "Non autorisé. Veuillez vous connecter pour rejoindre une coloc." });
            }
            const user = await Users.findByPk(req.userId);
            if (user.current_coloc_id){
                return res.status(400).json({ message: "Vous êtes déjà membre d'une coloc!" });
            }
            if (coloc) {
                if (coloc.groupe_code_valid === groupe_code_valid) {
                    await Users.update({current_coloc_id: coloc.coloc_id}, {where:{user_id:req.userId}});
                    
                    res.json(coloc);
                } else {
                    res.status(401).json({ message: 'Code incorrect' });
                }
            } else {
                res.status(404).json({ message: 'Colocation non trouvée' });
            }
        } catch (error) {
            console.error('Erreur lors de la vérification du code pour accéder à la colocation :', error);
            res.status(500).json({ message: 'Erreur lors de la vérification du code pour accéder à la colocation' });
        }
    },
    // leave a coloc
    async handleUserLeave(req, res){
        try{
            if (!req.userId) {
                return res.status(401).json({ message: "Non autorisé. Veuillez vous connecter pour quitter une coloc." });
            }
            const user = await Users.findOne({where:{user_id:req.session.userId}});
            // const user = await Users.findOne({ where: { user_id: req.session.userId, current_coloc_id: colocId } });}
            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé." });
            }
            
            const colocId = user.current_coloc_id;

            await generateCodeOnUserLeave(colocId);

            await Users.update({ current_coloc_id: null }, { where: { user_id: req.userId } });

            const countUsersInColoc = await Users.count({ where: { current_coloc_id: colocId } });
            if (countUsersInColoc === 0) {
                await Colocs.destroy({ where: { coloc_id: colocId } });
                return res.status(200).json({ message: "Utilisateur a quitté la colocation avec succès. La colocation a été supprimée car elle est vide." });
            }

            return res.status(200).json({ message: "Utilisateur a quitté la colocation avec succès." });
            
        }catch (error) {
            console.error("Erreur lors de la gestion du départ de l'utilisateur de la colocation :", error);
            return res.status(500).json({ message: "Erreur lors de la gestion du départ de l'utilisateur de la colocation." });
        }

    },
    async generateNewCode(req, res) {
        try {
          const id = req.params.id;
          const coloc = await Colocs.findByPk(id);
          if (coloc) {
            const code = Math.floor(10000000 + Math.random() * 90000000)
              .toString()
              .substring(0, 8);
            await coloc.update({ lien_coloc: code, groupe_code_valid: code });
            res
              .status(200)
              .json({ message: "Changement de code effectué", newCode: code });
          } else {
            res.status(404).json({
              message:
                "Colocation non trouvée lors de la génération du code pour la colocation ",
            });
          }
        } catch (error) {
          res.status(500).json({ message: "Une erreur est survenue" });
        }
    },
};

module.exports = colocController;