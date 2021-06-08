import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { deletePost, addLike, removeLike } from "../../action/postActions";

class PostItem extends Component {
  handleDeleteClick(id) {
    this.props.deletePost(id);
  }
  handleLikeClick(id) {
    this.props.addLike(id);
  }
  handleUnlikeClick(id) {
    this.props.removeLike(id);
  }
  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter((like) => like.user === auth.user.id).length > 0) {
      // if the length is more than 0 ==> that means user has liked it
      return true;
    } else {
      return false;
    }
  }
  render() {
    const { post, auth, showActions } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="">
              <img
                src={post.avatar}
                alt="User Avatar"
                className="rounded-circle d-none d-md-block"
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ? (
              <span>
                <button
                  className="btn btn-light mr-1"
                  type="button"
                  onClick={this.handleLikeClick.bind(this, post._id)}
                >
                  <i
                    className={classnames("fas fa-thumbs-up", {
                      "text-info": this.findUserLike(post.likes),
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <button className="btn btn-light mr-1" type="button">
                  <i
                    className="text-secondary fas fa-thumbs-down"
                    onClick={this.handleUnlikeClick.bind(this, post._id)}
                  ></i>
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                {post.user === auth.user.id ? (
                  <button
                    className="btn btn-danger mr-1"
                    type="button"
                    onClick={this.handleDeleteClick.bind(this, post._id)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  PostItem
);
