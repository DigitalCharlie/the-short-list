// THE BASIC DEPENDENCIES
require('dotenv').config()
const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000
const taskController = require('./controllers/task')

// BUILD STUFF
const path = require('path')

// MIDDLEWARE
app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')))  // serve static file

// USE THE ROUTES
app.use('/api', taskController)

app.get('.*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

// NAVI IS HERE
app.listen(PORT, () => {
    console.log(`Hey! Listen! On port: ${PORT}`)
})