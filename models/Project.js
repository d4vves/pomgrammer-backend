const mongoose = require('mongoose')

const PomSchema = new mongoose.Schema({
    focus: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    github: {
        type: String
    },
    poms: [PomSchema],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Project', ProjectSchema)