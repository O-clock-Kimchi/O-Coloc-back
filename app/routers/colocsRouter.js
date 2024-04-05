const colocsRouter = require('express').Router();
const colocController = require('../controllers/colocController');

colocsRouter.post('/user/:userId/colocs/create', colocController.create);
colocsRouter.get('/user/:userId/colocs/:id', colocController.show);
colocsRouter.patch('/colocs/:id', colocController.update);
colocsRouter.delete('/colocs/:id', colocController.destroy);

colocsRouter.post('/user/:userId/colocs/join', colocController.join);

colocsRouter.post('/colocs/:id/leave', colocController.handleUserLeave);

module.exports = colocsRouter;