//import pakage
const express = require('express');
const router = express.Router();

//import module 
const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")
const publisherController = require("../controllers/publisherController")

//authorcontroller
router.post("/createAuthor", authorController.createAuthor  )
router.get("/getAuthorsData", authorController.getAuthorsData)

//bookcontroller
router.post("/createBook", bookController.createBook  )
router.get("/getBooksData", bookController.getBooksData)
router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails )
router.put("/createAttribute", bookController.createAttribute)
router.put("/updateRating", bookController.updateRating)

//publisherController
router.post("/createPublisher", publisherController.createPublisher )
router.get("/getPublisher", publisherController.getPublisher )

module.exports = router;