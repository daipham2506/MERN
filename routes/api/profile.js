const express = require("express")
const router = express.Router()

// @route   GET api/profile
// @Access  Public
router.get('/', (req,res)=> res.send("Profile route"))

module.exports = router