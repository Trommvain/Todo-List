const fs = require("fs");
const path = require("path");

const models = {};

const files = fs.readdirSync(__dirname);

const jsFiles = files.filter(
  (file) => file.slice(-3) === ".js" && file !== "index.js"
);

jsFiles.forEach((file) => {
  const model = require(path.join(__dirname, file));
  models[model.name] = model;
});

module.exports = models;
