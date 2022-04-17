// THE BASIC DEPENDENCIES
require('dotenv').config()
const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000
const taskController = require('./controllers/task')

// MIDDLEWARE
app.use(express.json())

// USE THE ROUTES
app.use('/tasks', taskController)

// NAVI IS HERE
app.listen(PORT, () => {
    console.log(`Hey! Listen! On port: ${PORT}`)
})