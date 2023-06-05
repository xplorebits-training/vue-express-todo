const UserModel = require('../../model/user');

const getProfileHandler = async (req, res) => {

  try {
    const userId = req.user.userId;
    const User = await UserModel.findById(userId);

    if (!User) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(User)
    return res.status(200).send({
      "firstName": User.firstName,
      "lastName": User.lastName,
      "phoneNumber": User.phoneNumber,
      "email": User.email,
      "photoURL": User.photoURL
    });
  } catch (error) {
    return res.status(500).send({ message: 'Internal server error' });
  }
};

module.exports = getProfileHandler;
