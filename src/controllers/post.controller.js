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

module.exports = {
  createNewPost,
};