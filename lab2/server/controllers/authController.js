const { validationResult } = require("express-validator");
const userModel = require('./../models/userModel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = '1234';

const generateAccesToken = (id, role) => {
    return jwt.sign({ id, role }, secret, {
        expiresIn: '24h'
    })
}


class authController {
    async login(req, res) {
        try {
            const { email, password } = req.body.data;
            const candidate = await userModel.findOne({ email });
            if (!candidate) {
                return res.json({ message: "Wrong email" });
            }
            const isPasswordCorrect = bcrypt.compareSync(password, candidate.password);
            if (!isPasswordCorrect) {
                return res.json({ message: "Wrong password" });
            }
            const token = generateAccesToken(candidate._id, candidate.role);
            return res.json({ token });
        }
        catch (e) {
            console.log(e);
            return res.json({ message: "login Error" });
        }
    }
    async register(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({ message: errors.array() });
            }
            const { email, password } = req.body;
            const candidate = await userModel.findOne({ email });
            if (candidate) {
                return res.json({ message: "User with this email has already registred" });
            }
            const hashPassword = bcrypt.hashSync(password, 10);
            const newUser = new userModel({ email, password: hashPassword, role: "USER" });
            await newUser.save();
            return res.json({ message: "User has registred" });
        }
        catch (e) {
            console.log(e);
            return res.json({ message: "Error" });
        }
    }
    async getUser(req, res) {
        try {
            const user_id = req.user.id;
            const User = await userModel.findById(user_id);
            res.json({ email: User.email, role: User.role });
        }
        catch (e) {
            res.json({ message: "error" });
        }
    }
}

module.exports = new authController();