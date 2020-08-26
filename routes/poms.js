const express = require('express')
const router = express.Router()
const Project = require('../models/Project')

router.post('/:id', (req, res) => {
    Project.findById(req.params.id)
    .then(project => {
        project.poms.push({
            focus: req.body.focus
        })
        project.save()
        .then(project => res.json(project))
        .catch(err => console.log(`🚦 ${err} 🚦`))
    })
    .catch(err => console.log(`🚦 ${err} 🚦`))
})

router.delete('/:id', (req, res) => {
    Project.findById(req.params.id)
    .then(project => {
        project.poms.id(req.body.id).remove()
        project.save()
        res.json(project)
    })
    .catch(err => console.log(`🚦 ${err} 🚦`))
})

module.exports = router