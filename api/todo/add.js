const TodoModel = require('../../model/todo');
const UserModel = require('../../model/user');

const addTodoHandler = async (req, res) => {
  let { title, description, due } = req.body;
  const userId = req.user.userId;

  try {
    const validateDueDate = (date) => {
      const dueDate = new Date(date);
      due = Math.floor(new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate()).getTime() / 1000);
      // due = `${dueDate.getFullYear()}-${dueDate.getMonth() + 1}-${dueDate.getDate()}`
      return dueDate instanceof Date && !isNaN(dueDate);
    }

    if (validateDueDate(due)) {
      const todo = new TodoModel({
        title,
        description,
        due,
        userId: userId
      });

      try {
        await todo.validate();
        const savedTodo = await todo.save();
        return res.status(200).send({ message: 'Todo item added successfully', item: savedTodo });
      } catch (error) {
        return res.status(400).send(error.message);
      }
    }

    return res.status(400).send({ error: 'Date format is wrong' })
  } catch (error) {
    return res.status(400).send({ error: "Adding todo list is failed" });
  }
};

module.exports = addTodoHandler;
