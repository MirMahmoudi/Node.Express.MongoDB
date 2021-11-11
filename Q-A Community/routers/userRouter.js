const express = require('express');
const userController = require('../controllers/userController');
const { requireAuth, checkUser } = require('../middleWares/authMiddleWare');

const userRouter = express.Router();

// in this way we not only check the request, but still check all kind of requests
// So if there is style, photo & ..., for each request this middleware is going to check for all of this
userRouter.all("*", checkUser);
userRouter.get("/", userController.getHomePage);
userRouter.all("/signUp", userController.getPostSignUp);
userRouter.all("/login", userController.getPostLogIn);
userRouter.get("/logout", userController.getLogOut);
userRouter.get("/controlPanel", requireAuth, userController.getPostCPanel);
userRouter.post("/controlPanel/:id", requireAuth, userController.getPostCPanel);

// in this way we just check the requests via the checkUser middle-ware function
// userRouter.get("/", checkUser, userController.getHomePage);
// userRouter.all("/signUp", checkUser, userController.getPostSignUp);
// userRouter.all("/login", userController.getPostLogIn);
// userRouter.get("/logout", checkUser, userController.getLogOut);
// userRouter.get("/controlPanel", checkUser, requireAuth, userController.getPostCPanel);
// userRouter.post("/controlPanel/:id", checkUser, requireAuth, userController.getPostCPanel);

module.exports = userRouter;          
