const { userService } = require('../services');

const INTERNAL_ERROR = 'internal INTERNAL_ERROR';

const findUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userToken = await userService.findUser(email, password);

    if (userToken.message) return res.status(400).json(userToken);
    return res.status(200).json({ token: userToken });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: INTERNAL_ERROR });
  }
};

const findAllUser = async (req, res) => {
  try {
    const allUsers = await userService.findAllUser();
    return res.status(200).json(allUsers);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: INTERNAL_ERROR });
  }
};

const findUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.findUserById(id);

    if (user.message) return res.status(404).json(user);
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: INTERNAL_ERROR });
  }
};

const createUser = async (req, res) => {
    try {
        const newUser = await userService.createUser(req.body);
        if (newUser.message) {
            return res.status(newUser.status)
            .json({ message: newUser.message });
        } 
        return res.status(201).json({ token: newUser });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: INTERNAL_ERROR });
    }
};

module.exports = {
  findUser,
  createUser,
  findAllUser,
  findUserById,
};