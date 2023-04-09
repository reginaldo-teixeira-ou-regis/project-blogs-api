const express = require('express');

const { userController } = require('../controllers');

const loginRouter = express.Router();

loginRouter.post('/', userController.findUser);

module.exports = loginRouter;