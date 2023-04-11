const { postService } = require('../services');

const createNewPost = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const userId = req.user.id;

    const post = await postService
      .createNewPost(title, content, userId, categoryIds);
    
    return res.status(201).json(post);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message });
  }
};

const findPosts = async (req, res) => {
  try {
    const userId = req.user.id;

    const posts = await postService.findPosts(userId);

    if (!posts) return res.status(404).json({ message: 'Post not found' });

    return res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message });
  }
};

const findPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await postService.findPostById(id, userId);

    if (!post) return res.status(404).json({ message: 'Post does not exist' });

    return res.status(200).json(post);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message });
  }
};

const findPostByIdAllUsers = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await postService.findPostByIdAllUsers(id);

    if (!post) return res.status(404).json({ message: 'Post does not exist' });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, content } = req.body;

    const post = await postService.updatePost(userId, id, title, content);

    if (!post) return res.status(401).json({ message: 'Unauthorized user' });

    return res.status(200).json(post);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const postAllUsers = await postService.findPostByIdAllUsers(id);
    if (!postAllUsers) return res.status(404).json({ message: 'Post does not exist' });

    const post = await postService.deletePost(userId, id);
    if (!post) return res.status(401).json({ message: 'Unauthorized user' });

    return res.status(204).end();
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message });
  }
};

const findPostByTerm = async (req, res) => {
  try {
    const { q } = req.query;
    const posts = await postService.findPostByTerm(q);
    if (!posts) return res.status(404).json({ message: 'Post does not exist' });
    
    return res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createNewPost,
  findPosts,
  findPostById,
  findPostByIdAllUsers,
  updatePost,
  deletePost,
  findPostByTerm,
};