const express = require('express');

const { categoryController } = require('../controllers');

const { authToken } = require('../middlewares/auth.middleware');

const categoryRouter = express.Router();

categoryRouter.post('/', authToken, categoryController.createCategory);
categoryRouter.get('/', authToken, categoryController.findAllCategories);

module.exports = categoryRouter;