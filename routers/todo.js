const express = require('express');
const addTodoHandler = require('../api/todo/add');
const getTodoItemsHandler = require('../api/todo/get/get');
const getTodoItemsDueTodayHandler = require('../api/todo/get/today');
const deleteTodoHandler = require('../api/todo/delete/delete');
const deleteAllTodoHandler = require('../api/todo/delete/delete-all');
const updateTodoHandler = require('../api/todo/update');

const router = express.Router();

router.post('/add', addTodoHandler);
router.get('/get', getTodoItemsHandler);
router.get('/get/today', getTodoItemsDueTodayHandler);
router.delete('/delete-all', deleteAllTodoHandler);
router.delete('/delete/:todoId', deleteTodoHandler);
router.put('/update/:todoId', updateTodoHandler);

module.exports = router;
