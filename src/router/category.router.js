const express = require('express');

const { categoryController } = require('../controllers');

const categoryRouter = express.Router();

const { authToken } = require('../middlewares');

categoryRouter.use(authToken);
categoryRouter.post('/', categoryController.createCategory);
categoryRouter.get('/', categoryController.findAllCategories);

module.exports = categoryRouter;