/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable padded-blocks */
/* eslint-disable eol-last */
/* eslint-disable keyword-spacing */


// User logout
exports.logout = (req, res) => {
    try {
        // Delete the cookie containing the JWT token
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        // Reply with a success message
        res.status(200).json({ message: 'Déconnexion réussie avec succès' });
    } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
        res.status(500).json({ message: 'Erreur lors de la déconnexion' });
    }
};

