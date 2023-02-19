const fs = require('fs').promises;
const { readFileOpts } = require('../config/db.json');
/**
 * Получает информацию из базы данных
 * @param {string} dbPath - путь к базе данных на диске
 * @returns {Promise<object[]>} массив объектов из базы данных
 */
module.exports.getDbAsArray = async (dbPath) => {
  const dbDataString = await fs.readFile(dbPath, readFileOpts);

  const data = JSON.parse(dbDataString || '[]');

  return data;
};
/**
 * Обновляет текстовую базу данных
 * @param {string} dbPath - путь к базе данных на диске
 * @param {object[]} newData - массив который надо записать
 * @returns {Promise}
 */
module.exports.updateDb = async (dbPath, newData) => {
  const updatedDb = JSON.stringify(newData, null, 2);
  return await fs.writeFile(dbPath, updatedDb);
};
