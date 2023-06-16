const UserModel = require('../../model/user');

const setProfileHandler = async function (req, res) {

  try {
    const userId = req.user.userId;
    const { firstName, lastName, phoneNumber } = req.body;

    const existUser = await UserModel.findById(userId);
    if (!existUser) {
      return res.status(404).send({ message: 'User not found' });
    }

    const newData = {
      firstName: firstName || existUser.firstName,
      lastName: lastName || existUser.lastName,
      phoneNumber: phoneNumber || existUser.phoneNumber
    }

    Object.assign(existUser, newData);

    try {
      await existUser.validate();
      const updatedUser = await existUser.save();
      res.status(200).send({
        message: 'Profile updated successfully',
        user: {
          "firstName": updatedUser.firstName,
          "lastName": updatedUser.lastName,
          "email": updatedUser.email,
          "phoneNumber": updatedUser.phoneNumber
        }
      });
    } catch (err) {
      return res.status(400).send({ error: err.message });
    }
  } catch (error) {
    return res.status(500).send({ error: 'Server error' });
  }
};

module.exports = setProfileHandler;
