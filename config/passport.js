require('dotenv').config()
const ExtractJwt = require('passport-jwt').ExtractJwt
const JwtStrat = require('passport-jwt').Strategy
const mongoose = require('mongoose')
const User = mongoose.model('User')

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = process.env.JWT_SECRET

module.exports = passport => {
    passport.use(new JwtStrat(opts, (jwt_payload, done) => {
        User.findById(jwt_payload._doc._id)
        .then(user => {
            if (user) {
                return done(null, user)
            }
            return done(null, false)
        })
        .catch(err => console.log(err))
    }))
}