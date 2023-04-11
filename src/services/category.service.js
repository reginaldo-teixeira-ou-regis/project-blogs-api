const { Category } = require('../models');
const { schemaCategory } = require('../middlewares/schema');

const createCategory = async (category) => {
  const { error } = schemaCategory.validate(category);
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