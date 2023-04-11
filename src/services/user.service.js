const { User } = require('../models');
const { generateToken } = require('../middlewares');
const { schemaUser } = require('../middlewares/schema');

const findUser = async (email, password) => {
  if (!email || !password) return { message: 'Some required fields are missing' };

  const user = await User.findOne({ where: { email, password } });
  if (!user) return { message: 'Invalid fields' };

  const token = generateToken(user.dataValues);
  return token;
};

const findAllUser = async () => {
  const users = User.findAll({
    attributes: { exclude: ['password'] },
  });
  return users;
};

const findUserById = async (id) => {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });

  if (!user) return { message: 'User does not exist' };
  return user;
};

const createUser = async (newUser) => {
  const { error } = schemaUser.validate(newUser);
  if (error) return { message: error.message, status: 400 };

  const userExists = await User.findOne({ where: { email: newUser.email } });
  if (userExists) return { message: 'User already registered', status: 409 };

  await User.create(newUser);
  const token = generateToken(newUser);
  return token;
};

module.exports = {
  findUser,
  createUser,
  findAllUser,
  findUserById,
};