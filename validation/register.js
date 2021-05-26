const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let err = {};

  data.name = !isEmpty(data.name) ? data.name : ''; // if data name is empty, convert it to string in order to pass it to validator isEmpty method
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.name, {
      min: 2,
      max: 30
    })) {
    err.name = 'Name must be between 2 and 30 characters';
  }
  if (!Validator.isEmail(data.email)) {
    err.email = 'Email is invalid';
  }
  if (!Validator.isLength(data.password, {
      min: 6,
      max: 30
    })) {
    err.password = 'Password must be at least 6 characters';
  }
  if (!Validator.equals(data.password, data.password2)) {
    err.password2 = 'Passwords must match';
  }
  if (Validator.isEmpty(data.name)) {
    err.name = 'Name field is required';
  }
  if (Validator.isEmpty(data.email)) {
    err.email = 'Name field is required';
  }
  if (Validator.isEmpty(data.password)) {
    err.password = 'Password field is required';
  }
  if (Validator.isEmpty(data.password2)) {
    err.password2 = 'Password field is required';
  }

  return {
    err,
    isValid: isEmpty(err)
  }
}