require('dotenv').config()
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (user) {
            return res.status(400).json({ message: 'Email already exists.' })
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        throw err
                    }
                    newUser.password = hash
                    newUser.save()
                    .then(user => res.status(207).json({ message: 'User created.' }))
                    .catch(err => console.log(err))
                })
            })
        }
    })
})

router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password
    User.findOne({ email: email })
    .then(user => {
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password. '})
        }
        bcrypt.compare(password, user.password)
        .then(match => {
            if (match) {
                const payload = {...user}
                delete payload.password
                delete payload.email
                jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 3600}, (err, token) => {
                    res.json({ success: true, token: `Bearer ${token}`})
                })
            } else {
                return res.status(400).json({ message: 'Invalid email or password.' })
            }
        })
    })
})

module.exports = router