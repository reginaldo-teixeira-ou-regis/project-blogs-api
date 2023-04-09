const jwt = require('jsonwebtoken');

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

module.exports = {
  generateToken,
  validateToken,
};