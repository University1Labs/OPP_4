const { Schema, model, SchemaType } = require("mongoose");

const userQuestion = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    testId: { type: Schema.Types.ObjectId, ref: "Test", required: true },
    number: { type: Number, required: true },
    option: { type: Number, required: true },
    passed: { type: Boolean, default: false },
    ok: { type: Boolean }
});

module.exports = model('userQuestion', userQuestion);