const mongoose = require('mongoose');
const todoSchema = require('../schema/todo');

const TodoModel = mongoose.models.todo || mongoose.model('todo', todoSchema);

module.exports = TodoModel;
