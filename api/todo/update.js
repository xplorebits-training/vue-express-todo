const TodoModel = require('../../model/todo');

const updateTodoHandler = async (req, res) => {
  const { userId } = req.user;
  const { title, description, due } = req.body;

  try {
    const existingTodo = await TodoModel.findOne({ userId });
    Object.assign(existingTodo, { title, description, due });

    try {
      await existingTodo.validate();
      const updatedTodo = await existingTodo.save();
      res.status(200).send({ message: "Updated successfully", UpdatedList: updatedTodo });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  } catch (error) {
    return res.status(500).send({ error: 'Server error' });
  }
};

module.exports = updateTodoHandler;
