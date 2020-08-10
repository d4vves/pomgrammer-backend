require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')

const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors({
    origin: process.env.CLIENT_URL,
    optionsSuccessStatus: 200
}))

const db = process.env.MONGODB_URI
mongoose.connect(db).then((() => console.log(`💃 MongoDB Connected 🕺`))).catch(err => console.log(err))
const User = require('./models/User')

app.get('/', (req,res) => {
    res.send('Up n attem!')
})

app.use(passport.initialize())
require('./config/passport')(passport)

app.listen(process.env.PORT || 1000, () => {console.log(`💃 Shuckin' n' jivin' on ${process.env.PORT} 🕺`)})