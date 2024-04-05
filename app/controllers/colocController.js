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

const bcrypt = require('bcrypt');

const colocController = {
    
    // Reclaim our coloc
    async show(req, res) {
        try {
            const id = req.params.id;
            const coloc = await Colocs.findByPk(id);
            if (!req.session.userId) {
                return res.status(401).json({ message: "Non autorisé. Veuillez vous connecter pour recupérer votre coloc." });
            }
            if (coloc) {
                res.json(coloc);
            } else {
                res.status(404).json({ message: 'Colocation non trouvée' });
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
            const { name, user_id } = req.body;
            if (!req.session.userId) {
                return res.status(401).json({ message: "Non autorisé. Veuillez vous connecter pour créer une coloc." });
            }
            if (!isValidName(name)) {
                return res.status(400).json({ message: "Le nom de la colocation doit faire au minimum 4 caractères." });
            }
            if (isValidNameRegex(name)) {
                return res.status(400).json({ message: "Le nom de la colocation contient des mots interdits." });
            }
            const code = Math.floor(10000000 + Math.random() * 90000000).toString().substring(0, 8);

            const newColoc = await Colocs.create({ name, user_id: req.session.userId, lien_coloc: code, groupe_code_valid:code});
            res.status(201).json(newColoc);

            await Users.update({current_coloc_id: newColoc.coloc_id},{where:{user_id:req.session.userId}});
                        
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
            
            if (!req.session.userId) {
                return res.status(401).json({ message: "Non autorisé. Veuillez vous connecter pour rejoindre une coloc." });
            }
            if (coloc) {
                if (coloc.groupe_code_valid === groupe_code_valid) {
                    await Users.update({current_coloc_id: coloc.coloc_id}, {where:{user_id:req.session.userId}});
                    
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
    async handleUserLeave(req, res){
        try{
            if (!req.session.userId) {
                return res.status(401).json({ message: "Non autorisé. Veuillez vous connecter pour quitter une coloc." });
            }
            const user = await Users.findOne({where:{user_id:req.session.userId}});
            // const user = await Users.findOne({ where: { user_id: req.session.userId, current_coloc_id: colocId } });}
            if (!user) {
                return res.status(404).json({ message: "Utilisateur non trouvé." });
            }
            
            await generateCodeOnUserLeave(user.current_coloc_id);

            await Users.update({ current_coloc_id: null }, { where: { user_id: req.session.userId } });
            return res.status(200).json({ message: "Utilisateur a quitté la colocation avec succès." });
            
        }catch (error) {
            console.error("Erreur lors de la gestion du départ de l'utilisateur de la colocation :", error);
            return res.status(500).json({ message: "Erreur lors de la gestion du départ de l'utilisateur de la colocation." });
        }

    }

};

module.exports = colocController;