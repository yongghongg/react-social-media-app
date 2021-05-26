const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile Model
const Profile = require('../../models/Profile');
//Load User Model
const User = require('../../models/User');
// Load Profile Validation
const validateProfileInput = require('../../validation/profile');


// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({
  msg: 'Profile is working'
}));

// @route   GET api/profile
// @desc    Get current user profile
// @access  Private
router.get('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const err = {};
  Profile.findOne({
      user: req.user.id
    })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      err.noprofile = 'There is no profile for this user';
      if (!profile) {
        return res.status(400).json(err);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
}); // we only need 'slash' here because we're in api/profile route already

// @route   GET api/profile
// @desc    Let user create/edit profile
// @access  Private
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const {
    err,
    isValid
  } = validateProfileInput(req.body);
  console.log(isValid);
  // Check validation
  if (!isValid) {
    return res.status(400).json(err);
  }

  // Get fields
  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
  // Skills - split into array
  if (typeof req.body.skills !== 'undefined') {
    profileFields.skills = req.body.skills.split(',');
  }
  //Social
  profileFields.social = {};
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
  if (req.body.facebook) profileFields.social.instagram = req.body.facebook;

  Profile.findOne({
      user: req.user.id
    })
    .then(profile => {
      if (profile) {
        // Update if profile already exists
        Profile.findOneAndUpdate({
          user: req.user.id
        }, {
          $set: profileFields
        }, {
          new: true
        }).then(profile => res.json(profile));
      } else {
        // Check if handle exists
        Profile.findOne({
          handle: profileFields.handle
        }).then(profile => {
          if (profile) {
            err.handle = 'Handle already exists';
            res.status(400).json(err);
          }
          //if not exists, create a new profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        })
      }
    })

});

module.exports = router;