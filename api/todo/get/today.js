const TodoModel = require('../../../model/todo');

const getTodoItemsDueTodayHandler = async (req, res) => {
  const { userId } = req.user
  try {
    const currentDate = new Date();

    const today = parseInt(currentDate.setHours(0, 0, 0) / 1000);
    const endDate = parseInt(currentDate.setHours(23, 59, 59) / 1000);

    const todoItems = await TodoModel.find({
      due: {
        $gte: today,
        $lt: endDate
      },
      userId
    });
    if (todoItems.length === 0) {
      return res.status(404).send({ message: "No todo items found" });
    }
    return res.status(200).json({ todoItems });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = getTodoItemsDueTodayHandler;
