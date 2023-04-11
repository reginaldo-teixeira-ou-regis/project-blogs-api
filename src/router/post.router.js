const express = require('express');

const postRouter = express.Router();

const { postController } = require('../controllers');
const { authToken, validateNewPost, validateUpdatePost } = require('../middlewares');

postRouter.use(authToken);
postRouter.post('/', validateNewPost, postController.createNewPost);
postRouter.get('/', postController.findPosts);
postRouter.get('/:id', postController.findPostById);
postRouter.put('/:id', validateUpdatePost, postController.updatePost);
postRouter.delete('/:id', postController.deletePost);

module.exports = postRouter;