const express = require("express")
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require("express-validator")
const config = require("config")
const jwt = require("jsonwebtoken")
const gravatar = require("gravatar")
const bcrypt = require('bcryptjs')

User = require('../../models/User')

// @route   GET api/auth
// @Access  Public
router.get('/', auth, async (req,res)=>{
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (err) {
        console.log((err.message));
        res.status(500).send('Server error');
        
    }
})

// @route   POST api/auth
// @Desc    Authentication user & get token
// @Access  Public
router.post(
    '/',
    [
        check('password','Password is required').exists(),
        check('email', 'Please include valid email').isEmail(),
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }

        const {  email, password } = req.body

        try {
            
            let user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({
                    msg: 'Invalid Credentials'
                })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if(!isMatch){
                return res.status(400).json({
                    msg: 'Invalid Credentials'
                })
            }

            //return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token)=>{
                    if(err){
                        throw err;
                    }
                    res.json({token})
                }
            )
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Server error")

        }
    })


module.exports = router
