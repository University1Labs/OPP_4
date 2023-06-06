const testModel = require("./../models/testModel");
const questionModel = require("./../models/questionModel");
const userQuestion = require("./../models/userQuestion");
const userTest = require("./../models/userTest");

class userController {
    async getTests(req, res) {
        try {
            const tests = await testModel.find();
            return res.json(tests);
        }
        catch (e) {
            console.log(e);
            return res.json({ message: "Server error" });
        }
    }
    async number(req, res) {
        try {
            const testId = req.body.testId;
            const test = await testModel.findById(testId);
            return res.json(test.number);
        }
        catch (e) {
            console.log(e);
            return res.json({ message: "Server error" });
        }
    }
    async getQuestion(req, res) {
        try {
            const testId = req.body.testId;
            const number = req.body.number;
            const question = await questionModel.findOne({ number: number, testId: testId });
            return res.json(question);
        }
        catch (e) {
            console.log(e);
            return res.json({ message: "Server error" });
        }
    }
    async answer(req, res) {
        try {
            const testId = req.body.testId;
            const userId = req.user.id;
            const number = req.body.number;
            const option = req.body.option;
            const question = await questionModel.findOne({ testId: testId, number: number });
            const userquestion = await userQuestion.findOne({ userId: userId, number: number, testId: testId });
            if (question.correctOption == option) {
                userquestion.ok = true;
                userquestion.passed = true;
                userquestion.option = req.body.option;
                userquestion.save();
            }
            else {
                userquestion.ok = false;
                userquestion.passed = true;
                userquestion.option = req.body.option;
                userquestion.save();
            }
            return res.json({ message: "Answer OK" });
        }
        catch (e) {
            console.log(e);
            return res.json({ message: "Server error" });
        }
    }
    async finish(req, res) {
        try {
            const testId = req.body.testId;
            const userId = req.user.id;
            const usertest = await userTest.findOne({ testId: testId, userId: userId });
            const questions = await userQuestion.find({ testId: testId, userId: userId });
            let count = 0;
            questions.forEach(question => {
                if (question.ok == true) {
                    count++;
                }
            });
            usertest.passed = true;
            usertest.count = count;
            await usertest.save();
            return res.json({ message: "OK finish" });
        }
        catch (e) {
            console.log(e);
            return res.json({ message: "Server error" });
        }
    }
    async start(req, res) {
        try {
            const testId = req.body.testId;
            const userId = req.user.id;
            const usertest = await userTest.findOne({ testId: testId, userId: userId });
            const questions = await userQuestion.find({ testId: testId, userId: userId });
            usertest.passed = false;
            usertest.count = 0;
            questions.forEach(question => {
                question.ok = false;
                question.passed = false;
                question.option = 0;
                question.save();
            });
            await usertest.save();
            return res.json({ message: "OK start" });
        }
        catch (e) {
            console.log(e);
            return res.json({ message: "Server error" });
        }
    }
    async getAnswer(req, res) {
        try {
            const testId = req.body.testId;
            const userId = req.user.id;
            const number = req.body.number;
            const question = await userQuestion.findOne({ userId: userId, number: number, testId: testId });
            if (!question) {
                const newQuestion = new userQuestion({ userId: userId, number: number, testId: testId, passed: false, ok: false, option: 0 });
                await newQuestion.save();
                return res.json(newQuestion);
            }
            return res.json(question);
        }
        catch (e) {
            console.log(e);
            return res.json({ message: "Server error" });
        }
    }
    async getResult(req, res) {
        try {
            const testId = req.body.testId;
            const userId = req.user.id;
            const test = await userTest.findOne({ testId: testId, userId: userId });
            if (!test) {
                const Test = await testModel.findById(testId);
                const newTest = new userTest({ testId: testId, userId: userId, passed: false, count: 0, number: Test.number });
                await newTest.save();
                return res.json(newTest);
            }
            return res.json(test);
        }
        catch (e) {
            console.log(e);
            return res.json({ message: "Server error" });
        }
    }
}


module.exports = new userController();