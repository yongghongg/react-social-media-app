import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addPost } from "../../action/postActions";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      err: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.err) {
      this.setState({ err: nextProps.err });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { user } = this.props.auth;
    const newPost = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar,
    };
    this.props.addPost(newPost);
    this.setState({ text: "" });
  }

  render() {
    const { err, text } = this.state;
    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info">What's on your mind?</div>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Create a post"
                  name="text"
                  value={text}
                  onChange={this.handleChange}
                  err={err.text}
                />
              </div>
              <button className="btn-btn-dark" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  err: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  err: state.err,
});

export default connect(mapStateToProps, { addPost })(PostForm);
