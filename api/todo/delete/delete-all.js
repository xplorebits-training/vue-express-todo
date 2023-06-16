const TodoModel = require('../../../model/todo');

const deleteAllTodoHandler = async (req, res) => {
  const { userId } = req.user;

  try {
    const existingUser = await TodoModel.deleteMany({ userId });
    if (existingUser.deletedCount === 0) {
      return res.status(404).send('No todo items found');
    } else {
      return res.send({ message: "All items are deleted", 'todo-items': existingUser });
    }
  } catch (error) {
    return res.status(500).send({ message: "Delete todo item failed" });
  }
};

module.exports = deleteAllTodoHandler;
