
// Initializing express, it's router and importing our data
const express = require('express')
const data = require('../data/project-data.json')
const router = express.Router()

// Our home route where we can render information about our projects by passing the data in as a locals object
router.get('/', (req, res) => {
    const allProjects = data.projects
    res.render('index', {
        data: allProjects
    })
})

// Rendering our about page at the about route
router.get('/about', (req, res) => {
    res.render('about')
})

// Creating our project routing that uses a request parameter to determine what project to render
router.get('/project/:id', (req, res) => {
    const {id} = req.params
    const projectData = data.projects[id]
    res.render('project', {
        data: projectData
    })
})

// Testing 500 internal server error with a custom route
router.get('/error', (req, res, next) => {
    const err = new Error('Internal Server Error')
    err.status = 500
    next(err)
})

// Exporting our routes top be used in the app.js at the root folder
module.exports = router