const { Task } = require("../models");

module.exports.createTask = async (req, res, next) => {
  try {
    const {
      body: { text },
    } = req;

    const task = await Task.create(text);

    res.status(200).send({ data: task });
  } catch (error) {
    next(error);
  }
};

module.exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.getAll();

    res.status(200).send({ data: tasks });
  } catch (error) {
    next(error);
  }
};

module.exports.getTask = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const task = await Task.get(id);

    res.status(200).send({ data: task });
  } catch (error) {
    next(error);
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const {
      body,
      params: { id },
    } = req;

    const updatedTask = await Task.update(body, id);

    res.status(200).send({ data: updatedTask });
  } catch (error) {
    next(error);
  }
};
module.exports.deleteTask = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const removedTask = await Task.remove(id);

    res.status(200).send({ data: removedTask });
  } catch (error) {
    next(error);
  }
};
