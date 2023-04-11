const express = require('express');

const postRouter = express.Router();

const { postController } = require('../controllers');
const { authToken, validateNewPost } = require('../middlewares');

postRouter.use(authToken);
postRouter.post('/', validateNewPost, postController.createNewPost);
postRouter.get('/', postController.findPosts);
postRouter.get('/:id', postController.findPostById);

module.exports = postRouter;