const router = require('express').Router();
const colocController = require('./controllers/colocController');

router.post('/colocs', colocController.create);
router.get('/colocs/:id', colocController.show);
router.patch('/colocs/:id/', colocController.update);
router.delete('/colocs/:id/', colocController.destroy);

module.exports = router;