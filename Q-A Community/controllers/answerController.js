const Answer = require('../models/answerModel');
const handleError = require('../middleWares/handleErrors');
const qController = require('./questionController');

const addAnswer = (req, res) => {
  const newAnswer = new Answer(req.body);
  newAnswer.user_id = res.locals.user._id;
  newAnswer.question_id = req.params.id;
  newAnswer.save()
    .then(() => res.redirect(`/showQuestion/${req.params.id}`))
    .catch(err => {
      const error = handleError(err)
      qController.showOneQuestion(req, res, error)
    })
}

const editAnswer = (req, res) => {
  if(req.method === "GET"){
    Answer.findById(req.params.id)
      /*  We should send "result" object null because of the answer form. In this way we won't have error in aForm.ejs.
          We have to have "result" object to presented its data in the same form, when we want to have the form in "showQuestion" page.
          We use one form (aForm.ejs) for both function(showOne Question() and editAnswer()).
          Go to questionController.js in showOneQuestion function */
      .then(answer => res.render("answers/updateAnswer", {pageTitle: "Update Answer", result: null, answer, error: null}))
      .catch(err => res.status(400).json(err.message))
  };
  if(req.method === "POST"){
    Answer.findById(req.params.id)
      .then(AResult => {
        AResult.answer = req.body.answer;
        AResult.save()
          .then(value => res.redirect(`/showQuestion/${value.question_id}`))
          .catch(err => {
            const error = handleError(err);
            res.render("answers/updateAnswer", {pageTitle: "Update Answer", result: null, answer: AResult, error})
          })
      })
      .catch(err => res.status(400).json(err.message))
  }
}

const delAnswer = (req, res) => {
  Answer.findByIdAndDelete(req.params.id)
    .then(result => res.redirect(`/showQuestion/${result.question_id}`))
    .catch(err => res.status(400).json(err.message))
}

module.exports = {
  addAnswer,
  delAnswer,
  editAnswer
};