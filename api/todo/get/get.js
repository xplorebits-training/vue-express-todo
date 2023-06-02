const TodoModel = require('../../../model/todo');
const { Types: { ObjectId } } = require('mongoose');

const getTodoItemsHandler = async (req, res) => {

  try {
    const { options } = req.body;
    const offsetId = options?.offset || null;

    const query = {};

    if (offsetId) {
      query._id = { $lt: new ObjectId(offsetId) };
    }

    const todoItems = await TodoModel.find(query)
      .sort({ _id: -1 }) // Sort by _id in descending order
      .limit(10); // Limit the result to 10 items

    let nextPageOffsetId = null;

    if (todoItems.length > 0) {
      nextPageOffsetId = todoItems[0]._id.toString();
    }

    return res.status(200).json({ todoItems, nextPageOffsetId });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve todo items' }); // Include the error message in the response
  }
};

module.exports = getTodoItemsHandler;
