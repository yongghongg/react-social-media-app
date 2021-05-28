const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');
// Load Post Model
const Post = require('../../models/Post');

// Load validation
const validatePostInput = require('../../validation/post');

// @route   GET api/posts/
// @desc    Get all posts
// @access  Public
router.get('/', (req, res) => {
  Post.find()
    .sort({
      date: -1
    })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({
      nopostfound: 'No posts found'
    }));
})

// @route   GET api/posts/
// @desc    Get post by id
// @access  Public
router.get('/:post_id', (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({
      nopostfound: 'No post found with that ID'
    }));
})


// @route   POST api/posts/
// @desc    Create post
// @access  Private
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const {
    err,
    isValid
  } = validatePostInput(req.body);
  // check validation
  if (!isValid) {
    return res.status(400).json(err);
  }
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id,
  })
  newPost.save().then(post => res.json(post));
})

// @route   DELETE api/posts/
// @desc    Delete
// @access  Private
router.delete('/:post_id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Profile.findOne({
      user: req.user.id
    })
    .then(profile => {
      Post.findById(req.params.post_id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({
              notauthorized: 'User not authorized'
            });
          }
          post.remove().then(() => res.json({ // !!be careful: it's not Post.remove, it's post.remove
            success: true
          }));
        })
        .catch(err => res.status(404).json({
          nopostfound: 'No post found with that ID'
        }));
    })
})

// @route   POST api/posts/like/:post_id
// @desc    Like post
// @access  Private
router.post('/like/:post_id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Profile.findOne({
      user: req.user.id
    })
    .then(profile => {
      Post.findById(req.params.post_id)
        .then(post => {
          if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({
              alreadyliked: 'User already liked this post'
            });
          }
          // add user id to likes array
          post.likes.unshift({
            user: req.user.id
          });
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({
          nopostfound: 'No post found with that ID'
        }));
    })
})

// @route   POST api/posts/unlike/:post_id
// @desc    Unlike post
// @access  Private
router.post('/unlike/:post_id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Profile.findOne({
      user: req.user.id
    })
    .then(profile => {
      Post.findById(req.params.post_id)
        .then(post => {
          if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({
              hasnotliked: 'User has not liked this post'
            });
          }
          // remove user id from likes array
          const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
          post.likes.splice(removeIndex, 1);
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({
          nopostfound: 'No post found with that ID'
        }));
    })
})

// @route   POST api/posts/comment/:post_id
// @desc    Add comment to post
// @access  Private
router.post('/comment/:post_id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  const {
    err,
    isValid
  } = validatePostInput(req.body);
  // check validation
  if (!isValid) {
    return res.status(400).json(err);
  }
  Post.findById(req.params.post_id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      }
      post.comments.unshift(newComment);
      post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({
      nopostfound: 'No post found with that ID'
    }));
})

// @route   DELETE api/posts/comment/:post_id/:comment_id
// @desc    Delete comment from post
// @access  Private
router.delete('/comment/:post_id/:comment_id', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Post.findById(req.params.post_id)
    .then(post => {
      // check to see if the comment exists
      if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
        return res.status(404).json({
          commentnotfound: 'Comment does not exist'
        });
      }
      // get index of the comment to be removed
      const removeIndex = post.comments.map(comment => comment._id.toString()).indexOf(req.params.comment_id);
      // check to see if user is authorized to remove the comment
      if (post.comments[removeIndex].user.toString() !== req.user.id) {
        return res.status(401).json({
          notauthorized: 'User not authorized'
        })
      };
      post.comments.splice(removeIndex, 1);
      post.save().then(post => res.json(post));
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({
        nopostfound: 'No post found with that ID'
      });
    })
})
module.exports = router;