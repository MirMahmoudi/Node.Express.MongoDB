module.exports = handleError = (err) => {
  let errors = {};
  // using registered email for making a new account (error code)
  if(err.code === 11000){
    errors.email = 'This email was already registered!';
    return errors;
  };
  
  // validation Errors
  if(err.message.includes('validation failed')){
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message;
    });
  };
  
  // email is empty
  if(err.message === 'email is empty'){
    errors.email = 'Please insert your email!';  
  };
  
  // password is empty
  if(err.message === 'password is empty'){
    errors.password = 'Please insert your password!';
  };
  
  // incorrect email
  if(err.message === 'incorrect email'){
    errors.email = 'This email is not registered!';  
  };
  
  // incorrect password
  if(err.message === 'incorrect password'){
    errors.password = 'The password is incorrect!';
  };

  return errors;
}