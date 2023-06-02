const TodoModel = require('../../model/todo');
const UserModel = require('../../model/user');

const addTodoHandler = async (req, res) => {
  const { title, description, due } = req.body;
  const userId = req.user.userId;

  try {
    const todo = new TodoModel({
      title,
      description,
      due,
      userId: userId
    });

    try {
      await todo.validate();
      const savedTodo = await todo.save();
      return res.status(200).send("Success");
    } catch (error) {
      return res.status(400).send(error.message);
    }
  } catch (error) {
    return res.status(400).send({ error: "Adding todo list is failed" });
  }
};

module.exports = addTodoHandler;
