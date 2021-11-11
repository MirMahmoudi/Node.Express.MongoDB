const User = require('../models/userModel');
const Question = require('../models/questionModel');
const jwt = require('jsonwebtoken');
const handleError = require('../middleWares/handleErrors')

const getHomePage = (req, res) => {
  Question.find().populate('user_id', ['userName', 'email'])
    .then( result => res.render("users/homePage", {pageTitle: "Home Page", result}) )
    .catch(err => res.status(400).json(err.message))
}

// create Json Web Token
const maxAge = 3 * 24 * 60 * 60;
const createJWToken = (id) => jwt.sign( {id}, "Q & A community", {expiresIn: maxAge} )

// GET method for rendering the sign up and log in page
// POST method for fetching data as a registration of new user and creating in DB
const getPostSignUp = async (req, res) => {
  if(req.method === "GET"){
    res.render("users/signUp", {pageTitle: "Sign Up", result: null, error: null})
  };

  if(req.method === "POST"){
    // console.log(req.cookie)
    // It is possible there are other info in req.body, so we should use destructuring method.
    const { userName, email, password } = req.body;
    try{
      const user = await User.create({ userName, email, password })
      const token = createJWToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.redirect("/");
    }
    catch(err){
      const error = handleError(err);
      res.render("users/signUp", {pageTitle: "Sign Up", result: req.body ,error})
    }
  };
}

// Log in function
const getPostLogIn = async (req, res) => {
  if(req.method === "GET"){
    res.render("users/logIn", {pageTitle: "Log in", result: null, error: null})
  };

  if(req.method === "POST"){
    const { email, password } = req.body;
    try{
      const user = await User.login(email, password);
      const token = createJWToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.redirect("/");
    }
    catch(err){
      const error = handleError(err);
      res.render("users/logIn", {pageTitle: "Log in", result: req.body, error})
    }
  };
}

const getLogOut = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
}

const getPostCPanel = (req, res) => {
  if(req.method === "GET"){
    res.render("users/controlPanel", {pageTitle: "Control Panel", warning: null})
  };

  if(req.method === "POST"){
    const { userName, email, password, rePassword } = req.body;
    let warning = {};

    if(password == ""){
      warning.password = "Please insert the password!"
      res.render("users/controlPanel", {pageTitle: "Control Panel", warning})
    }else if(rePassword == ""){
      warning.rePassword = "Please insert same password here!"
      res.render("users/controlPanel", {pageTitle: "Control Panel", warning})
    }else if(password !== rePassword){
      warning.password = "The password is not matched, please try again!"
      res.render("users/controlPanel", {pageTitle: "Control Panel", warning})
    }else if(password === rePassword){
      User.findById(req.params.id)
        .then(result => {
          result.userName = userName;
          result.email = email;
          result.password = password;
          result.save()
            .then(() => res.redirect("/"))
            .catch(err => {
              warning = handleError(err);
              res.render("users/controlPanel", {pageTitle: "Control Panel", warning})
            })
        })
        .catch(err => res.status(400).json(err.message))
    };
  };
}

module.exports = {
  getHomePage,
  getPostSignUp,
  getPostLogIn,
  getLogOut,
  getPostCPanel
};