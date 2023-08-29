const express = require('express')
const router = express.Router()
const Signup = require('../modals/signup')
var bcrypt = require('bcryptjs');

router.post('/signup', (req, res) => {
    //password bcrypt
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            res.status(500).json({ error: err, message: err })
        } else {
            //constructor clone data
            const user = new Signup(
                {
                    email: req.body.email,
                    password: hash,
                    createdAt: req.body.createdAt,
                }
            );
            //saving user to db
            user.save()
                .then(result => {
                    console.log("result", result)
                    res.status(201).json({ message: 'User Created' })
                }).catch(err => {
                    console.log("signup_error", err)
                    if (err.code == 11000) {
                        res.status(401).json({ error: err, message: "An account with this email address already exists" })
                    }
                    else {
                        res.status(500).json({ error: err, message: err })
                    }
                })
        }
    })
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body
    if (email && password) {
        //finding user in db
        const user = await Signup.findOne({ email })
        if (!user) {
            return res.status(409).json({ message: 'Your log in information is incorrect' })
        }
        //password matching
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(409).json({ message: "Invalid password" })
        }
        res.status(200).json(user)
    }
    else {
        return res.status(400).json({ message: "There is missing parameter" })
    }
})

module.exports = router