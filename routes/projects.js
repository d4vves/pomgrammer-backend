const express = require('express')
const router = express.Router()

const User = require('../models/User')
const Project = require('../models/Project')

router.get('/', (req, res) => {
    User.findById(req.user._doc._id)
    .populate('projects')
    .exec(function (err, user) {
        if (err) res.send(err)
        res.json(user.projects)
    })
})

router.get('/:id', (req, res) => {
    Project.findById(req.params.id)
    .then(project => {
        res.json(project)
    })
    .catch(err => console.log(`🚦 ${err} 🚦`))
})

router.post('/', (req, res) => {
    User.findById(req.user._doc._id)
    .then(user => {
        const newProject = new Project({
            title: req.body.title,
            description: req.body.description,
            github: req.body.github
        })
        newProject.save()
        user.projects.push(newProject)
        user.save()
        .then(res.send('Project created!'))
        .catch(err => console.log(`🚦 ${err} 🚦`))
    })
})

router.put('/:id', (req, res) => {
    Project.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {new: true}
    )
    .then(updatedProject => {
        res.send(updatedProject)
    })
    .catch(err => console.log(`🚦 ${err} 🚦`))
})

router.delete('/:id', (req, res) => {
    Project.findOneAndDelete({ _id: req.params.id })
    .then(deletedProject => {
        User.update(
            { _id: req.user._doc._id },
            { $pull: { projects: req.params.id }}
        )
        .then(res.send(`Deleted: ${deletedProject.title}`))
        .catch(err => console.log(`🚦 ${err} 🚦`))
    })
})

module.exports = router