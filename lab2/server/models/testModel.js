const { Schema, model, SchemaType } = require("mongoose");

const Test = new Schema({
    name: { type: String, required: true, unique: true },
    number: { type: Number, default: 0 }
});

module.exports = model('Test', Test);