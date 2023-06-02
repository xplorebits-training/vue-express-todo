const express = require('express');
const addTodoHandler = require('../api/todo/add');
const getTodoItemsHandler = require('../api/todo/get/get');
const getTodoItemsDueTodayHandler = require('../api/todo/get/today');

const router = express.Router();

router.post('/add', addTodoHandler);
router.get('/get', getTodoItemsHandler);
router.get('/get/today', getTodoItemsDueTodayHandler);

module.exports = router;
