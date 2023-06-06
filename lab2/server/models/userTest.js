const { Schema, model, SchemaType } = require("mongoose");

const userTest = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    testId: { type: Schema.Types.ObjectId, ref: "Test", required: true },
    passed: { type: Boolean, default: false },
    count: { type: Number, },
    number: { type: Number, }
});

module.exports = model('userTest', userTest);