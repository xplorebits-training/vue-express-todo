const TodoModel = require('../../../model/todo');

const getTodoItemsDueTodayHandler = async (req, res) => {

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const endDate = new Date(today);
    endDate.setDate(today.getDate() + 1);

    const todoItems = await TodoModel.find({
      due: {
        $gte: today.toISOString(),
        $lt: endDate.toISOString()
      }
    });

    return res.status(200).json({ todoItems });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = getTodoItemsDueTodayHandler;
