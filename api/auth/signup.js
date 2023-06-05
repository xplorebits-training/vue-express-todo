const UserModel = require('../../model/user');
const { getHashFromPassword, generateToken } = require('../../lib/utils');

const signupHandler = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ message: 'User already exists' });
    }

    const User = new UserModel({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
    });

    try {
      await User.validate();
      const hashPassword = await getHashFromPassword(password);
      User.password = hashPassword;
      const savedUser = await User.save();

      const jwtToken = generateToken(savedUser);

      return res.status(200).send({
        message: 'Signup successful',
        user: {
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          phoneNumber: savedUser.phoneNumber,
          email: savedUser.email
        }
      });
    } catch (err) {
      return res.status(400).send({ error: err.message });
    }
  } catch (error) {
    return res.status(400).send({ message: 'Signup failed' });
  }
};

module.exports = signupHandler;
