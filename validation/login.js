const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let err = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isLength(data.password, {
      min: 6,
      max: 30
    })) {
    err.password = 'Password must be at least 6 characters';
  }
  if (Validator.isEmpty(data.password)) {
    err.password = 'Password field is required';
  }
  if (!Validator.isEmail(data.email)) {
    err.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.email)) {
    err.email = 'Email field is required';
  }

  return {
    err,
    isValid: isEmpty(err)
  }
}