const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  // name and gravatar will remain even after the account is deleted
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  }],
  comments: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    text: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    avatar: {
      type: String
    },
    date: { // date for the comment
      type: Date,
      default: Date.now
    }
  }],
  date: { // date for the post
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('post', PostSchema);