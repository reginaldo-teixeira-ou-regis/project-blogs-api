const express = require('express');

const { userController } = require('../controllers');

const { authToken } = require('../middlewares/auth.middleware');

const userRouter = express.Router();

userRouter.get('/', authToken, userController.findAllUser);
userRouter.get('/:id', authToken, userController.findUserById);
userRouter.post('/', userController.createUser);

module.exports = userRouter;