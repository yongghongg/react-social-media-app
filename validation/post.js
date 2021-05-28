const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let err = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, {
      min: 5,
      max: 300
    })) {
    err.text = 'Post must be between 5 and 300 characters';
  }

  if (Validator.isEmpty(data.text)) {
    err.text = 'Text field is required';
  }

  return {
    err,
    isValid: isEmpty(err)
  }
}