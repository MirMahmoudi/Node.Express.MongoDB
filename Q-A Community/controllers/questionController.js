const Question = require('../models/questionModel');
const Answer = require('../models/answerModel');
const handleError = require('../middleWares/handleErrors');

const addQuestion = (req, res) => {
  if(req.method === "GET"){
  res.render("questions/addQuestion", {pageTitle: "Ask a Question", newQuestion: null, result: null, error: null});
  };
  if(req.method === "POST"){
    const { question, description } = req.body;
    const newQuestion = new Question({ question, description });
    newQuestion.user_id = res.locals.user;
    newQuestion.save()
      .then(() => res.redirect("/"))
      .catch(err => {
        const error = handleError(err);
        res.render("questions/addQuestion", {pageTitle: "Ask a Question", newQuestion, result: null, error});
      })
  }
}

const showOneQuestion = (req, res, error= {}) => {
  Question.findById(req.params.id).populate('user_id', ['userName', 'email'])
    .then( result => {
      Answer.find({ question_id: {$in: [result._id]} }).populate('user_id', ['userName', 'email'])
        .then(answers => {
          /*  We should send "answer" object null because of the answer form. In this way we can presented the form empty.
              We have to have "answer" object to presented its data in the same form, when we want to update the answers.
              We use one form (aForm.ejs) for both function(showOne Question() and editAnswer()).
              Go to answerController.js in editAnswer function part "GET" */
          res.render("questions/showQuestion", {pageTitle: "Show the Question", result, answers, answer: null, error});
        })
        .catch(err => res.status(400).json(err.message))
    })
    .catch(err => res.status(400).json(err.message))
}

const editQuestion = (req, res) => {
  if(req.method === "GET"){
    Question.findById(req.params.id)
    .then(result => {
      res.render("questions/updateQuestion", {pageTitle: "Update the Question", newQuestion: null, result, error: null});
    })
    .catch(err => res.status(400).json(err.message))
  };
  if(req.method === "POST"){
    Question.findById(req.params.id)
      .then(result => {
        result.question= req.body.question;
        result.description= req.body.description;
        result.save()
          .then(() => res.redirect("/"))
          .catch(err => {
            const error = handleError(err)
            res.render("questions/updateQuestion", {pageTitle: "Update the Question", newQuestion: null, result, error});
          })
      })
      .catch(err => res.status(400).json(err.message))
  };
}

const delQuestion = (req, res) => {
  Question.findByIdAndDelete(req.params.id)
    .then((question) => {
      Answer.find({question_id: {$in: [question._id]}}).remove()
        .then(() => res.redirect("/"))
        .catch(err => res.status(400).json(err.message))
    })
    .catch(err => res.status(400).json(err.message))
}

module.exports = {
  addQuestion,
  showOneQuestion,
  delQuestion,
  editQuestion
};