const { verifyToken } = require('../lib/utils');

const authMiddleware = (req, res, next) => {
  const token = (req?.headers?.authorization || '').split('Bearer ')[1];
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
