const { Category } = require('../models');
const { validateCategory } = require('./validation/schema');

const createCategory = async (category) => {
  const { error } = validateCategory.validate(category);
  if (error) return { message: error.message };
  const newCategory = await Category.create(category);
  return newCategory;
};

const findAllCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  createCategory,
  findAllCategories,
};