const express = require("express")
const router = express.Router()

// @route   GET api/posts
// @Access  Public
router.get('/', (req,res)=> res.send("Post route"))

module.exports = router