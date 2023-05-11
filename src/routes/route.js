const express = require('express')
const router = express.Router();
const controler = require('../controllers/controller')
const middleware = require('../middleware/middleware')


router.post('/createUser',controler.createUser)
router.post('/loginUser', controler.loginUser)
router.get('/user/:userid', middleware.authorisation, controler.user)
router.put('/updateUser/:userid', middleware.authorisation, controler.updateUser)
router.put('/deleteUser/:userid', middleware.authorisation, controler.deleteUser)

module.exports = router;