const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
  const token = req.cookies.jwt; // We can use this syntax, if we install cookie-parser

  // Checking jwt if exist and verified
  if(token){
    try{
      const verifiedDecode = await jwt.verify(token, "Q & A community");
      // console.log("---from requireAuth in middleWare---",verifiedDecode ,"---from requireAuth in middleWare---");
      next();
    }
    catch(err){
      //Should handling error
      // console.log( "This error comes from 'catch' in middleWare, 'requireAuth' function!", err, "This error comes from 'catch' in middleWare, 'requireAuth' function!");
      res.redirect("/login");
    }
  }else{
    // console.log("This message as an ERROR comes from authMiddleWare, 'requireAuth' function!");
    res.redirect("/login");
  };
}

//checking current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt; // We can use this syntax, if we install cookie-parser
  if(token){
    jwt.verify(token, "Q & A community", async (err, decodedToken) => {
      if(err) {
        // console.log("This ERROR comes from middleWare 'checkUser' function" ,err , "This ERROR comes from middleWare 'checkUser' function");
        res.locals.user = null;
        next();
      };
      if(decodedToken) {
        let { _id, userName, email, createdAt, updatedAt } = await User.findById(decodedToken.id);
        res.locals.user = { _id, userName, email };
        // console.log("from middleWare, 'checkUser' function!", res.locals.user, "from middleWare, 'checkUser' function!");
        next();
      }
    }) 
  }else if(!token){  
    res.locals.user = null;
    // console.log(req.method, req.path )
    // console.log("There is no login, comes from middleware, 'checkUser' function!");
    next();
  };
}

module.exports = {
  requireAuth,
  checkUser
};