const { User } = require('../models');

module.exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.getAll();
    res.status(200).send({ data: users });
  } catch (error) {
    next(error);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const user = await User.get(id);

    res.status(200).send({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const { body: userData } = req;

    const user = await User.create(userData);

    res.status(201).send({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const {
      body: { userData },
      params: { id },
    } = req;
    const user = await User.update({ userData, id });

    res.status(201).send({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;
    const deletedId = await User.remove(id);

    res.status(200).send({ data: deletedId });
  } catch (error) {
    next(error);
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;

    const user = await User.getByEmail(email);

    if (user && user.password === password) {
      const { password, ...userWithoutPassword } = user;
      return res.status(200).send({ data: userWithoutPassword });
    }

    const error = new Error('No user with such data');
    error.code = 404;
    throw error;
  } catch (error) {
    next(error);
  }
};
