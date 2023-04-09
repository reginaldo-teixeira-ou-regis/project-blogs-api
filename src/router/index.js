const express = require('express');

const router = express.Router();

const loginRouter = require('./login.router');

const userRouter = require('./user.router');

router.use('/login', loginRouter);

router.use('/user', userRouter);

module.exports = router;