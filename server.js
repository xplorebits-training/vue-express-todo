const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const UserModel = require('./model/user');
const TodoModel = require('./model/todo');
const authRoutes = require('./routers/auth');
const userRoutes = require('./routers/user');
const todoRoutes = require('./routers/todo');
const authMiddleware = require('./middleware/auth');
require('./database').init();
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', authMiddleware, userRoutes);
app.use('/api/todo', authMiddleware, todoRoutes);
app.use('/public/user-dp/', express.static(path.join(process.env.HOME, 'user-dp')));

let port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
