const express = require('express');

const { userController } = require('../controllers');

const { authToken } = require('../middlewares');

const userRouter = express.Router();

userRouter.post('/', userController.createUser);
userRouter.get('/', authToken, userController.findAllUser);
userRouter.get('/:id', authToken, userController.findUserById);
userRouter.delete('/me', authToken, userController.deleteUser);

module.exports = userRouter;