const colocsRouter = require('express').Router();
const colocController = require('../controllers/colocController');

colocsRouter.post('/colocs/create', colocController.create);
colocsRouter.get('/colocs/:id', colocController.show);
colocsRouter.patch('/colocs/:id', colocController.update);
colocsRouter.delete('/colocs/:id', colocController.destroy);

colocsRouter.post('/colocs/join', colocController.join);

colocsRouter.post('/colocs/:id/leave', colocController.handleUserLeave);

colocsRouter.patch('/colocs/:id/code', colocController.generateNewCode);


module.exports = colocsRouter;