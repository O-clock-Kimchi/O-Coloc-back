const router = require('express').Router();
const colocController = require('./controllers/colocController');

router.post('/colocs/create', colocController.create);
router.get('/colocs/:id', colocController.show);
router.patch('/colocs/:id', colocController.update);
router.delete('/colocs/:id', colocController.destroy);

router.post('/colocs/join', colocController.join);

// router.post('/colocs/:id/leave', colocController.handleUserLeave);


module.exports = router;