const Users= require('../models/Users');

// deconnexion du compte utilisateur
exports.logout =  (req, res) => {
    try {
    req.session.destroy((err) => {
        if (err) {
            console.error('Erreur de deconnexion:', err);
            return res.status(500).json({message: 'Erreur lors de la deconnexion', err});
        }

        res.status(200).json({message: 'Déconnexion réussie avec succès'});
    });

    }catch (error) {
        console.error('Erreur de deconnexion:', error);
        res.status(500).json({message: 'Erreur lors de la deconnexion'});
    }
};