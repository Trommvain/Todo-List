const yup = require("yup");

const TASK_TEXT_SCHEMA = yup
  .string()
  .matches(/^[^ ]/, "must be valid task string")
  .required();

module.exports.TASK_CREATION_SCHEMA = yup.object().shape({
  text: TASK_TEXT_SCHEMA,
});

module.exports.TASK_UPDATE_SHEMA = yup.object().shape({
  isDone: yup.boolean().required(),
  text: TASK_TEXT_SCHEMA,
});


module.exports.CREATE_USER_SCHEMA = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required()
})