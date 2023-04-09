const { validateToken } = require('../services/validation/auth');

const authToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const authorizedToken = validateToken(authorization);
    if (authorizedToken.message) return res.status(401).json(authorizedToken);
    req.user = authorizedToken;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  authToken,
};