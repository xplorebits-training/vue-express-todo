const UserModel = require('../../model/user');
const { verifyPassword, generateToken } = require('../../lib/utils');

const signinHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const User = await UserModel.findOne({ email });

    if (!User) {
      return res.status(404).send({ message: 'User not found' });
    }

    const match = await verifyPassword(password, User.password);
    if (match) {
      const newToken = generateToken(User);
      return res.status(200).send(newToken);
    } else {
      return res.status(401).send('Wrong password');
    }
  } catch (error) {
    return res.status(401).send({ message: 'Invalid token' });
  }
};

module.exports = signinHandler;
