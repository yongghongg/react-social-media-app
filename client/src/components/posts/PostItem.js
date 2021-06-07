import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Link } from "react-router-dom";

class PostItem extends Component {
  handleDeleteClick(id) {
    console.log(id);
  }

  render() {
    const { post, auth } = this.props;
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
            <button className="btn btn-light mr-1" type="button">
              <i className="text-info fas fa-thumbs-up">
                <span className="badge badge-light">{post.likes.length}</span>
              </i>
            </button>
            <button className="btn btn-light mr-1" type="button">
              <i className="text-info fas fa-thumbs-down"></i>
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
          </div>
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PostItem);
