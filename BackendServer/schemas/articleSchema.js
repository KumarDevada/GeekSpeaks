// articleSchema.js

const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    heading: String,
    text: String,
    code: String,
    language: String,
    uid: String,
    uname: String,
    date: String,
});

module.exports = mongoose.model('Articles', articleSchema);
