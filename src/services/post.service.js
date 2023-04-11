const { BlogPost, PostCategory, Category, User } = require('../models');

const createNewPost = async (title, content, userId, categoryIds) => {
  const findCategories = await Category.findAll({ where: { id: categoryIds } });
  if (findCategories.length !== categoryIds.length) {
    throw new Error('one or more "categoryIds" not found');
  }
  const post = await BlogPost.create({
    title,
    content,
    userId,
    published: new Date(),
    updated: new Date(),
  });
  const categories = await findCategories.map((ctgr) => ({
    postId: post.id,
    categoryId: ctgr.id,
  }));
  await PostCategory.bulkCreate(categories);
  return post;
};

const findPosts = async (userId) => {
  const posts = await BlogPost.findAll({
    where: { userId },
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });

  return posts;
};

const findPostById = async (userId, id) => {
  const post = await BlogPost.findOne({
    where: { userId, id },
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  return post;
};

const findPostByIdAllUsers = async (id) => {
  const post = await BlogPost.findOne({ where: { id } });
  return post;
};

const updatePost = async (userId, id, title, content) => {
  await BlogPost.update(
    { title, content, updated: new Date() },
    { where: { userId, id } },
  );

  const post = await BlogPost.findOne({
    where: { userId, id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return post;
};

const deletePost = async (userId, id) => {
  try {
    const result = await BlogPost.destroy({ where: { userId, id } });
    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
};

module.exports = {
  createNewPost,
  findPosts,
  findPostById,
  findPostByIdAllUsers,
  updatePost,
  deletePost,
};