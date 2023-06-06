const Router = require("express");

const userRouter = new Router();
const userController = require("./../controllers/userController");
const authMiddleware = require('./../middlewares/authMiddleware');


userRouter.get('/tests', authMiddleware.Authorized, userController.getTests);
userRouter.post('/question', authMiddleware.Authorized, userController.getQuestion);
userRouter.post('/answer', authMiddleware.Authorized, userController.answer);
userRouter.post('/start', authMiddleware.Authorized, userController.start);
userRouter.post('/finish', authMiddleware.Authorized, userController.finish);
userRouter.post('/getAnswer', authMiddleware.Authorized, userController.getAnswer);
userRouter.post('/getResult', authMiddleware.Authorized, userController.getResult);
userRouter.post('/number', authMiddleware.Authorized, userController.number);

module.exports = userRouter;