const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
  let err = {};

  data.title = !isEmpty(data.title) ? data.title : '';
  data.company = !isEmpty(data.company) ? data.company : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if (Validator.isEmpty(data.title)) {
    err.title = 'Job title field is required';
  }
  if (Validator.isEmpty(data.company)) {
    err.company = 'Company field is required';
  }
  if (Validator.isEmpty(data.from)) {
    err.from = 'From date field is required';
  }

  return {
    err,
    isValid: isEmpty(err)
  }
}