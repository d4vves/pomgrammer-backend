const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    portfolio: {
      type: String
    },
    github: {
      type: String
    },
    linkedin: {
      type: String
    },
    projects: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    }],
    date: {
      type: Date,
      default: Date.now
    },
})

module.exports = mongoose.model('User', UserSchema)