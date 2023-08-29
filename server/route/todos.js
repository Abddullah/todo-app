const express = require('express')
const router = express.Router()
const Todos = require('../modals/todos')

router.post('/add', (req, res) => {
    const { todo, userId } = req.body
    if (todo && userId) {
        const todoCreate = new Todos(
            {
                todo: todo,
                userId: userId,
            }
        );
        todoCreate.save()
            .then(result => {
                res.status(200).json({ message: 'Todo Saved', result })
            }).catch(err => {
                console.log("error", err)
                res.status(500).json({ error: err, message: err })
            })
    }
    else {
        return res.status(400).json({ message: "There is missing parameter" })
    }
})

router.get('/allList/:_id', (req, res) => {
    const { _id } = req.params
    if (_id) {
        Todos.find({ userId: _id })
            .then(result => {
                if (!result || result.length === 0) {
                    return res.status(200).json({ data: [], message: "No data exist" })
                } else {
                    return res.status(200).json({ data: result });
                }
            }).catch(err => {
                console.log("error", err)
                res.status(500).json({ error: err, message: err })
            })
    }
    else {
        return res.status(400).json({ message: "There is missing parameter" })
    }
})

router.patch('/update', (req, res) => {
    const { _id, todo } = req.body
    if (_id && todo) {
        Todos.updateOne({ "_id": _id }, {
            todo: todo,
        }, function (err, result) {
            if (err) {
                res.status(500).json({ error: err })
            } else {
                res.status(200).json({ message: "todo updated!" })
            }
        })
    }
    else {
        return res.status(400).json({ message: "There is missing parameter" })
    }
})

router.delete('/delete/:_id', (req, res) => {
    const { _id } = req.params
    if (_id) {
        Todos.deleteOne({ "_id": _id }, {
        }, function (err, result) {
            if (err) {
                res.status(500).json({ error: err })
            } else {
                res.status(200).json({ message: "todo deleted!" })
            }
        })
    }
    else {
        return res.status(400).json({ message: "There is missing parameter" })
    }
})

module.exports = router


