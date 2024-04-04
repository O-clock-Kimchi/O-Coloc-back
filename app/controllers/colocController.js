const Colocs = require('../models/Colocs');
const {  isValidName, isValidNameRegex } = require('../utils/fonctions.js');

const bcrypt = require('bcrypt');


const colocController = {
    
    // Reclaim our coloc
    async show(req, res) {
        try {
            const id = req.params.id;
            const coloc = await Colocs.findByPk(id);
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
                return res.status(400).json({ message: "Le nom de la colocation doit faire au moins 3 caractères." });
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
            if (isValidNameRegex(name)) {
                return res.status(400).json({ message: "Le nom de la colocation doit faire au moins 3 caractères." });
            }
            if (!isValidName(name)) {
                return res.status(400).json({ message: "Le nom de la colocation contient des mots interdits." });
            }
            const code = Math.floor(10000000 + Math.random() * 90000000).toString().substring(0, 8);
            const hashedCode = await bcrypt.hash(code, 10);

            const newColoc = await Colocs.create({ name, user_id, lien_coloc: code, groupe_code_valid:code});
            res.status(201).json(newColoc);
            
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
            
            if (coloc) {
                if (coloc.groupe_code_valid === groupe_code_valid) {
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
    }
};

module.exports = colocController;