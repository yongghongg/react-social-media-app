const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEducationInput(data) {
  let err = {};

  data.school = !isEmpty(data.school) ? data.school : '';
  data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : '';
  data.degree = !isEmpty(data.degree) ? data.degree : '';
  data.from = !isEmpty(data.from) ? data.from : '';

  if (Validator.isEmpty(data.school)) {
    err.school = 'School field is required';
  }
  if (Validator.isEmpty(data.fieldOfStudy)) {
    err.fieldOfStudy = 'Field of study is required';
  }
  if (Validator.isEmpty(data.degree)) {
    err.degree = 'Degree field is required';
  }
  if (Validator.isEmpty(data.from)) {
    err.from = 'From date field is required';
  }

  return {
    err,
    isValid: isEmpty(err)
  }
}