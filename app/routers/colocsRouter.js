const colocsRouter = require('express').Router();
const colocController = require('../controllers/colocController');

colocsRouter.post('/colocs/create', colocController.create);
colocsRouter.get('/colocs/:id', colocController.show);
colocsRouter.patch('/colocs/:id', colocController.update);
colocsRouter.delete('/colocs/:id', colocController.destroy);

colocsRouter.post('/colocs/join', colocController.join);

// router.post('/colocs/:id/leave', colocController.handleUserLeave);

module.exports = colocsRouter;