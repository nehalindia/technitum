const express = require('express')
const router = express.Router()
const dbController = require('../controller/controller.js')


router.get('/check', dbController.check)
router.post('/createBook', dbController.createBook)
router.post('/createAuthor', dbController.createAuthor)
router.get('/bookName', dbController.bookName)
router.post('/findAuthor', dbController.findAuthor)
router.get('/findAuthorInRange', dbController.findAuthorInRange )

module.exports = router