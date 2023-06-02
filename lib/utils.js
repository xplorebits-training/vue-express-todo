const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getHashFromPassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const verifyPassword = (rawPass, hashPass) => {
  return bcrypt.compare(rawPass, hashPass);
};

const generateToken = (user) => {
  const payload = {
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  };
  const expiresIn = '1d';
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.SECRET_KEY);
};

module.exports = { getHashFromPassword, verifyPassword, generateToken, verifyToken };
