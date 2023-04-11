const jwt = require('jsonwebtoken');

const { schemaNewPost } = require('./schema');

const secretkey = process.env.JWT_SECRET;

const configJWT = {
  expiresIn: '15d',
  algorithm: 'HS256',
};

const generateToken = (payload) => {
  const token = jwt.sign(payload, secretkey, configJWT);
  return token;
};

const validateToken = (token) => {
  if (!token) return { message: 'Token not found' };
  const tokenValid = jwt.verify(token, secretkey);
  return tokenValid;
};

const validateNewPost = (req, res, next) => {
  const validation = schemaNewPost.validate(req.body);
  if (validation.error) {
    res.status(400).json({ message: 'Some required fields are missing' });
    throw new Error(validation.error);
  }
  next();
};

module.exports = {
  generateToken,
  validateToken,
  validateNewPost,
};