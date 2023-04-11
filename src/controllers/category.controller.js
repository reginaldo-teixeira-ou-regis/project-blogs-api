const { categoryService } = require('../services');

const INTERNAL_ERROR = 'Internal error';

const createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);
    if (category.message) return res.status(400).json(category);
    return res.status(201).json(category);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: INTERNAL_ERROR });
  }
};

const findAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.findAllCategories();
    return res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: INTERNAL_ERROR });
  }
};

module.exports = {
    createCategory,
    findAllCategories,
};