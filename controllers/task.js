const express = require('express')
const router = express.Router()
const Task = require('../models/Task')

// INDEX / GET ALL TASKS
router.get("/", (req,res) => {
    Task.find({}, (err, foundTasks) => {
        if(!err) {
            res.status(200).json(foundTasks)
        } else {
            res.status(400).json(err)
        }
    })
})

// TABLE MAKING ROUTE
router.get('/table', (req,res) => {
    Task.find({}, (err, foundTasks) => {
        if(!err) {
            const formattedData = foundTasks.reduce((acc, item) => {
                acc[item.status] = acc[item.status] ? [...acc[item.status], item] : [item]
                return acc
            }, {})
            res.status(200).json(formattedData)
        } else {
            res.status(400).json(err)
        }
    })
})

// DELETE
router.delete('/:id', (req,res)=> {
    Task.findByIdAndDelete(req.params.id, (err) => {
        if(!err) {
            res.status(200).json({message: "That task has been deleted"})
        } else {
            res.status(400).json(err)
        }
    })
})

// UPDATE

router.put('/:id', (req,res) => {
    const {body} = req
    Task.findByIdAndUpdate(req.params.id, body, {new: true}, (err, updatedTask) => {
        if(!err) {
            res.status(200).json(updatedTask)
        } else {
            res.status(400).json(err)
        }
    })
})

// CREATE
router.post("/", (req,res) => {
    const { body } = req

    Task.create(body, (err,createdTask) => {
        if(!err) {
            res.status(200).json({message: "All good!", createdTask})
        } else {
            res.status(400).json(err)
        }
    })
})


// SHOW
router.get("/:id", (req,res) => {
    Task.findById(req.params.id, (err, foundTask) => {
        if(!err) {
            res.status(200).json(foundTask)
        } else {
            res.status(400).json(err)
        }
    })
})

module.exports = router