const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: [ true, "Please insert a name!" ]
  },
  email: {
    type: String,
    required: [ true, "Please insert an email address!" ],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please insert a valid email!"]
  },
  password: {
    type: String,
    required: [ true, "Please insert a password!" ],
    minlength: [ 6, "Password should has at least 6 characters!"]
  }
}, {timestamps: true});

// Before saving data in DB, password should be bcrypt through pre function
userSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next()
})

// static to check the user, who is going to login
// through the static, controller can search the whole data in db

// userSchema.statics.login = async function (email, password){
//   if(email == ''){
//     throw Error("email is empty");
//   }else if(password == ''){
//     throw Error("password is empty");
//   }else{
//     const user = await this.findOne({ email });
//     if(user){
//       const auth = await bcrypt.compare(password, user.password);
//       if(auth){return user};
//       throw Error("incorrect password");
//     };
//     throw Error("incorrect email")
//   };
// }
userSchema.statics.login = async function (email, password){
  if(email == '') throw Error("email is empty");

  if(password == '') throw Error("password is empty");

  const user = await this.findOne({ email });
  if(user){
    const auth = await bcrypt.compare(password, user.password);
    if(auth) return user;
    throw Error("incorrect password");
  };
  throw Error("incorrect email")
}

const User = mongoose.model("User", userSchema);

module.exports = User;