const mongoose = require('mongoose');
const User = require('./userModel');
const Question = require('./questionModel');

const Schema = mongoose.Schema;

const answerSchema = new Schema({
  answer: {
    type: String,
    required: [true, "Please answer the question before hit the button!"],
    minlength: [5, "Minimum answer length should be 5 characters!"]
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: User
  },
  question_id: {
    type: Schema.Types.ObjectId,
    ref: Question
  }
},{timestamps: true});

Answer = mongoose.model("answer", answerSchema);

module.exports = Answer;