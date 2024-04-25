const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/user');

dotenv.config();

const authenticate = async (req, res, next) => {
  let token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  token = token.replace("Bearer ", "")
  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log({ error, token });
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = authenticate;
