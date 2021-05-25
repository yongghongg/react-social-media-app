const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/key');
const passport = require('passport');

// Load User Model
const User = require('../models/User');

// Load User Validation
const validateRegisterInput = require('../../validation/register');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({
  msg: 'Users is working'
}));

// @route   GET api/users/register
// @desc    Register users
// @access  Public
router.post('/register', (req, res) => {
  console.log(req.body);
  const {
    err,
    isValid
  } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(err);
  }

  User.findOne({
      email: req.body.email
    })
    .then(user => {
      if (user) {
        return res.status(400).json({
          email: 'Email already exists'
        });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar: avatar,
          password: req.body.password
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err; //original! 
            // if (err) res.status(400).json(err); 
            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          })
        })
      }
    })
})

// @route   GET api/users/login
// @desc    Login users / Returning Jason Web Tokens
// @access  Public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  //find user by email
  User.findOne({
      email
    })
    .then(user => {
      // check for user
      if (!user) {
        return res.status(404).json({
          email: 'User not found'
        });
      }
      // check password
      bcrypt.compare(password, user.password)
        .then(isMatched => {
          if (isMatched) {
            // user matched, create payload
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar
            }
            // sign token
            jwt.sign(payload, keys.secretOrKey, {
              expiresIn: 3600
            }, (err, token) => {
              res.json({
                success: true,
                token: 'Bearer ' + token
              })
            });

          } else {
            return res.status(400).json({
              password: 'Password incorrect'
            });
          }
        })
    })
})

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
})

module.exports = router;