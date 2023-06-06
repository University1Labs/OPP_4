const Router = require("express");
const authController = require('./../controllers/authController');
const authRouter = new Router();
const { body } = require("express-validator");
const authMiddleware = require('./../middlewares/authMiddleware');

authRouter.post('/login', authController.login);
authRouter.post('/register',
    body('email').isEmail(),
    body('password').isLength({ min: 4, max: 25 }),
    authController.register);
authRouter.get('/check', authMiddleware.Authorized, (req, res) => {
    try {
        return res.json({ user: req.user });
    }
    catch (e) {
        console.log(e);
        res.json({ message: "Error" })
    }
});

authRouter.get('/getUser', authMiddleware.Authorized, authController.getUser);

module.exports = authRouter;