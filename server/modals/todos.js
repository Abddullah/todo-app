const mongoose = require('mongoose')

const TodosSchema = mongoose.Schema({
    todo: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Number,
        default: Date.now(),
        required: false,
    },
})

const Todos = mongoose.model('todos', TodosSchema)

module.exports = Todos
