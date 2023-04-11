const express = require('express');

const { userController } = require('../controllers');

const { authToken } = require('../middlewares');

const userRouter = express.Router();

userRouter.post('/', userController.createUser);
userRouter.use(authToken);
userRouter.get('/', userController.findAllUser);
userRouter.get('/:id', userController.findUserById);
userRouter.delete('/me', userController.deleteUser);

module.exports = userRouter;