
// Initialize express
const express = require('express')
const app = express()

// Setting template engine and static route
app.set('view engine', 'pug')
app.use('/static', express.static('public'))

// Import all routes for our web server from custom file
const routes = require('./routes')
app.use(routes)

// Middleware handler for 404 error page
app.use((req, res, next) => {
    const err = new Error('Page Not Found')
    err.status = 404
    next(err)
})

// Global error handler for 404 error pages OR internal server error if 404 isn't provided
app.use((err, req, res, next) => {
    res.locals.error = err
    if (err.status && err.message) {
        res.status(err.status)
        res.render('error')
    } 
    else {
        res.status(500)
        err.message = 'Interal Server Error'
        res.render('error')
    }
})

// Set app to work on localhost:3000
app.listen(3000)