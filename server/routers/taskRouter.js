const taskRouter = require("express").Router();
const taskController = require("../controllers/taskController");
const {
  validateTaskBody,
  validateTaskUpdateBody,
} = require("../middlewares/taskMWs");

// 1 вариант записи
// taskRouter
//   .route("/")
//   .post(validateTaskBody, taskController.createTask)
//   .get(taskController.getTasks);

// 2 вариант записи
taskRouter.post("/", validateTaskBody, taskController.createTask);
taskRouter.get("/", taskController.getTasks);

taskRouter
  .route("/:id")
  .get(taskController.getTask)
  .put(validateTaskUpdateBody, taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = taskRouter;
