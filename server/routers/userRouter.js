const userRouter = require("express").Router();
const userController = require("../controllers/userController");

userRouter.get("/", userController.getUsers);
userRouter.post("/auth/login", userController.loginUser);
userRouter.post("/auth/signup", userController.createUser);


userRouter
  .route("/:id")
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;
