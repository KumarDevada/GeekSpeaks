// questionSchema.js

const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
    text: String,
    code: String,
    language: String,
    date: String,
    uid: String,
    uname: String,
})

const questionSchema = new mongoose.Schema({
    text: String,
    code: String,
    language: String,
    date: String,
    solutions: [solutionSchema]
});

module.exports = mongoose.model('Questions', questionSchema);
