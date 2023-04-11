const { BlogPost, PostCategory, Category } = require('../models');

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

module.exports = {
  createNewPost,
};