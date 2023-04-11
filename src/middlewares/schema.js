const Joi = require('joi');

const schemaUser = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string(),
});

const schemaCategory = Joi.object({
  name: Joi.string().required(),
});

const schemaNewPost = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().min(1).required(),
});

const schemaUpdatePost = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

module.exports = {
  schemaUser,
  schemaCategory,
  schemaNewPost,
  schemaUpdatePost,
};