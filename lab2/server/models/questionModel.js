const { Schema, model, SchemaType } = require("mongoose");

const Question = new Schema({
    testId: { type: Schema.Types.ObjectId, ref: "Test", required: true },
    text: { type: String, required: true },
    number: { type: Number, },
    optionA: { type: String, required: true },
    optionB: { type: String, required: true },
    optionC: { type: String, required: true },
    optionD: { type: String, required: true },
    correctOption: { type: Number, require: true }

});

module.exports = model('Question', Question);