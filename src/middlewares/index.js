const { authToken } = require('./auth');

const {
  generateToken,
  validateToken,
  validateNewPost,
  validateUpdatePost,
} = require('./validate');

module.exports = {
  authToken,
  generateToken,
  validateToken,
  validateNewPost,
  validateUpdatePost,
};