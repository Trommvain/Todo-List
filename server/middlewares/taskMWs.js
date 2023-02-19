const {
  TASK_CREATION_SCHEMA,
  TASK_UPDATE_SHEMA,
} = require("../utils/validationShemas");

module.exports.validateTaskBody = async (req, res, next) => {
  try {
    const validBody = await TASK_CREATION_SCHEMA.validate(req.body);
    req.body = validBody;
    next();
  } catch (error) {
    error.code = 400;
    next(error); // если дальще передавать в обработчик ошибок
  }
};

module.exports.validateTaskUpdateBody = async (req, res, next) => {
  try {
    const validBody = await TASK_UPDATE_SHEMA.validate(req.body);
    req.body = validBody;
    next();
  } catch (error) {
    // next(error); // если дальще передавать в обработчик ошибок
    res.status(400).send({ message: error.message }); // сразу отправить ответ с ошибкой
  }
};
