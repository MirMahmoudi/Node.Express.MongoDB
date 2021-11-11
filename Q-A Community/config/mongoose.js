const mongoose = require('mongoose');

const urlDB = "mongodb://localhost/Q&A";

mongoose.connect( urlDB )
  .then( () => console.log("connected to db ...") )
  .catch( err => console.log(err) )