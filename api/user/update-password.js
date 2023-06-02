const UserModel = require('../../model/user');
const { getHashFromPassword } = require('../../lib/utils');

const updatePasswordHandler = async (req, res) => {

  try {
    const userId = req.user.userId;
    const { password } = req.body;

    const existingUser = await UserModel.findById(userId);
    if (!existingUser) {
      return res.status(404).send({ message: 'User not found' });
    }

    existingUser.password = password;
    try {
      await existingUser.validate();

      const hashedPassword = await getHashFromPassword(password);
      existingUser.password = hashedPassword;

      const updatedUser = await existingUser.save();

      return res.status(200).send({ message: 'Password updated successfully' });
    } catch (err) {
      return res.status(400).send({ error: err.message });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Server error' });
  }
};

module.exports = updatePasswordHandler;
