const { Router } = require('express');
const controllers = require('../controllers')
const router = Router();

router.get('/', (req, res) => res.send('This is root!'))

router.get('/shows', controllers.getAllShows)
router.post('/shows', controllers.createShow)
router.get('/shows/:id', controllers.getShowById)
router.put('/shows/:id', controllers.updateShow)
router.delete('/shows/:id', controllers.deleteShow)

router.post('/sign-up', controllers.signUp)
router.post('/sign-in', controllers.signIn)
router.get('/verify', controllers.verifyUser)
router.post('/change-password', controllers.changePassword)

router.get('/genres', controllers.someBullshit)

module.exports = router;