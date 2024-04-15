const colocsRouter = require('express').Router();
const colocController = require('../controllers/colocController');
const authenticateToken = require('../../middlewares/authenticateToken');

colocsRouter.post('/colocs/create', authenticateToken, colocController.create);
colocsRouter.get('/colocs/:id', authenticateToken, colocController.show);
colocsRouter.patch('/colocs/:id', authenticateToken, colocController.update);
colocsRouter.delete('/colocs/:id', authenticateToken, colocController.destroy);

colocsRouter.post('/colocs/join', authenticateToken, colocController.join);

colocsRouter.post('/colocs/:id/leave', authenticateToken, colocController.handleUserLeave);

module.exports = colocsRouter;