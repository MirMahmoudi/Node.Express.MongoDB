const mongoose = require('mongoose');
const User = require('./userModel')

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: {
    type: String,
    required: [true, "Please put a question!"],
    minlength:  [3, "Minimum question length should be 3 characters!"]
  },
  description: {
    type: String,
    required: [true, "Please type a description about your question!"],
    minlength:  [5, "Minimum description length should be 5 characters!"]
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: User
  }
},{timestamps: true});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;