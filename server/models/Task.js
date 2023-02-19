const path = require("path");
const { getDbAsArray, updateDb } = require("../utils/modelUtils");

const dbPath = path.resolve(__dirname, "../", "db/", "tasks.json");

class Task {
  static create = async (text) => {
    const tasks = await getDbAsArray(dbPath);

    const newTask = {
      id: Date.now(),
      text,
      isDone: false,
    };

    tasks.push(newTask);

    await updateDb(dbPath, tasks);

    return newTask;
  };

  static get = async (taskId) => {
    const tasks = await getDbAsArray(dbPath);

    const foundTaskId = tasks.findIndex((task) => task.id === Number(taskId));

    if (!tasks.length || foundTaskId === -1) {
      const error = new Error("Task doesnt exist");
      error.code = 404;
      throw error;
    }

    const task = tasks.find((task) => task.id === Number(taskId));

    return task || null;
  };

  static getAll = async () => {
    const tasks = await getDbAsArray(dbPath);

    return tasks;
  };

  static update = async (taskData, id) => {
    const tasks = await getDbAsArray(dbPath);

    const foundTaskId = tasks.findIndex((task) => task.id === Number(id));

    if (!tasks.length || foundTaskId === -1) {
      const error = new Error("Task doesnt exist");
      error.code = 404;
      throw error;
    }

    const newTasks = tasks.map((task) => {
      const isSameTask = task.id === Number(id);
      const updatedTask = isSameTask
        ? {
            ...task,
            ...taskData,
          }
        : task;

      return updatedTask;
    });

    await updateDb(dbPath, newTasks);

    return taskData;
  };

  static remove = async (taskId) => {
    const tasks = await getDbAsArray(dbPath);

    const foundTaskId = tasks.findIndex((task) => task.id === Number(taskId));

    if (!tasks.length || foundTaskId === -1) {
      const error = new Error("Task doesnt exist");
      error.code = 404;
      throw error;
    }

    const newTasks = tasks.filter((task) => task.id !== +taskId);

    await updateDb(dbPath, newTasks);

    return taskId;
  };
}

module.exports = Task;
