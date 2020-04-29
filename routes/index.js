const { Router } = require('express');
const controllers = require('../controllers')
const router = Router();

router.get('/', (req, res) => res.send('This is root!'))
router.get('/shows', controllers.getAllShows)
router.post('/shows', controllers.createShow)
router.get('/shows/:id', controllers.getShowById)
router.put('/shows/:id', controllers.updateShow)
router.delete('/shows/:id', controllers.deleteShow)

module.exports = router;