const isEmail = (email) => {
  const regEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

//takes out whitespace
const isEmpty = (string) => {
  if (string.trim() === "") return true;
  else return false;
};

exports.validateLoginData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = "Must not be empty";
  if (isEmpty(data.password)) errors.password = "Must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
exports.validateSignupData = (data) => {
  let errors = {};

  //Make sure emails are valid
  if (isEmpty(data.email)) {
    errors.email = "Email must not be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be a valid email address";
  }
  //Other data validation
  if (isEmpty(data.password)) errors.password = "Must not be empty";
  if (data.password.length < 6)
    errors.password = "Your password must be longer than 6 characters";
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = "Passwords must be the same";
  //   if (isEmpty(data.weight))
  //     errors.handle = "Cmon you don't weight less than 50lbs";
  if (isEmpty(data.height)) errors.height = "Height must not be empty";
  if (isEmpty(data.gender)) errors.gender = "Gender must not be empty";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
