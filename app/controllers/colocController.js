const Colocs = require('../models/Colocs');

const colocController = {
    
    // Récupérer notre colocation
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

    // Modifier nom de la coloc
    async update(req, res) {
        try {
            const id = req.params.id;
            const name = req.body.name;
            const coloc = await Colocs.findByPk(id);
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

    // Supprimer la colocation
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

    // Créer une colocation
    async create(req, res) {
        try {
            const { name } = req.body;
            const newColoc = await Colocs.create({ name});
            res.status(201).json(newColoc);
        } catch (error) {
            console.error('Erreur lors de la création de la colocation :', error);
            res.status(500).json({ message: 'Erreur lors de la création de la colocation' });
        }
    }
};

module.exports = colocController;