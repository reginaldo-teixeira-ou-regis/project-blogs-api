const express = require('express');

const postRouter = express.Router();

const { postController } = require('../controllers');
const { validateNewPost } = require('../middlewares');
const { authToken } = require('../middlewares');

postRouter.use(authToken);
postRouter.post('/', validateNewPost, postController.createNewPost);

module.exports = postRouter;