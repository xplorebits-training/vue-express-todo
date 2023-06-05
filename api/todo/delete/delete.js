const TodoModel = require('../../../model/todo');

const deleteTodoHandler = async (req, res) => {
  const todoId = req.params.todoId;

  try {
    const existingTodo = await TodoModel.findById(todoId);

    if (!existingTodo) {
      return res.status(404).send({ message: 'Todo item does not exist' });
    }

    const deletedTodoItem = await TodoModel.findByIdAndDelete(todoId);

    return res.send({ message: 'Todo item is deleted', 'todo-item': deletedTodoItem });
  } catch (error) {
    return res.status(500).send({ message: "Delete todo item failed" });
  }
};

module.exports = deleteTodoHandler;
