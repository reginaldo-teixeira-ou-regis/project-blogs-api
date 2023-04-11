const { authToken } = require('./auth');

const {
  generateToken,
  validateToken,
  validateNewPost,
} = require('./validate');

module.exports = {
  authToken,
  generateToken,
  validateToken,
  validateNewPost,
};