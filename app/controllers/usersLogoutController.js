/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable padded-blocks */
/* eslint-disable eol-last */
/* eslint-disable keyword-spacing */
const Users= require('../models/Users');

// Déconnexion de l'utilisateur
exports.logout = (req, res) => {
    try {
        // Supprimer le cookie contenant le token JWT
        res.clearCookie('jwt');

        // Répondre avec un message de succès
        res.status(200).json({ message: 'Déconnexion réussie avec succès' });
    } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
        res.status(500).json({ message: 'Erreur lors de la déconnexion' });
    }
};

// // deconnexion du compte utilisateur avec EXPRESS SESSION
// exports.logout = (req, res) => {
//     try {
//     req.session.destroy((err) => {
//         if (err) {
//             console.error('Erreur de deconnexion:', err);
//             return res.status(500).json({message: 'Erreur lors de la deconnexion', err});
//         }

//         res.status(200).json({message: 'Déconnexion réussie avec succès'});
//     });

//     }catch (error) {
//         console.error('Erreur de deconnexion:', error);
//         res.status(500).json({message: 'Erreur lors de la deconnexion'});
//     }
// };
