const path = require('path');
const fs = require('fs').promises;
const { getDbAsArray, updateDb } = require('../utils/modelUtils');

const dbPath = path.resolve(__dirname, '../', 'db/', 'users.json');
class User {
  static async create(userData) {
    const users = await getDbAsArray(dbPath);

    const newUser = {
      ...userData,
      id: Date.now(),
    };

    const existingUser = users.find(
      (user) => user.email.toLowerCase() === newUser.email.toLowerCase()
    );

    if (existingUser) {
      const error = new Error('User with this email already exists');
      error.code = 409;
      throw error;
    }

    const { password, ...userWithoutPassword } = newUser;

    users.push(newUser);

    await updateDb(dbPath, users);

    return userWithoutPassword;
  }

  static async getAll() {
    const users = await getDbAsArray(dbPath);

    return users.map((user) => {
      const { password, ...userWithoutPassword } = user;

      return userWithoutPassword;
    });
  }

  static async get(id) {
    const users = await getDbAsArray(dbPath);

    const user = users.find((user) => user.id === +id);

    if (!users.length || !user) {
      const error = new Error('User not found');
      error.code = 404;
      throw error;
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static async getByEmail(email) {
    const users = await getDbAsArray(dbPath);

    const user = users.find((user) => {
      const res = user.email.toLowerCase() === email.toLowerCase();

      return res;
    });

    if (!users.length || !user) {
      const error = new Error('User not found');
      error.code = 404;
      throw error;
    }

    return user;
  }

  static async update({ userData, id }) {
    const users = await getDbAsArray(dbPath);

    const userIndex = users.findIndex((user) => user.id === +id);

    if (!users.length || userIndex === -1) {
      const error = new Error('User not found');
      error.code = 404;
      throw error;
    }

    const newUsers = users.map((user, index) => {
      const isSameUser = index === userIndex;
      const updatedUser = isSameUser ? { ...user, ...userData } : { ...user };
      return updatedUser;
    });

    await updateDb(dbPath, newUsers);

    const { password, ...userWithoutPassword } = newUsers[userIndex];
    return userWithoutPassword;
  }

  static async remove(id) {
    const users = await getDbAsArray(dbPath);

    const userIndex = users.findIndex((user) => user.id === +id);

    if (!users.length || userIndex === -1) {
      const error = new Error('User not found');
      error.code = 404;
      throw error;
    }

    const newUsers = users.filter((user) => user.id !== +id);

    await updateDb(dbPath, newUsers);

    return id;
  }
}

module.exports = User;
