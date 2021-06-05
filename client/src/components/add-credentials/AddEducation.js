import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import TextFieldGroup from "../common/TextFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEducation } from "../../action/profileActions";

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      fieldOfStudy: "",
      degree: "",
      from: "",
      to: "",
      current: false,
      description: "",
      err: {},
      disabled: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleCheck() {
    this.setState({
      current: !this.state.current,
      disabled: !this.state.disabled,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.err) {
      this.setState({
        err: nextProps.err,
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const newEduData = {
      school: this.state.school,
      fieldOfStudy: this.state.fieldOfStudy,
      degree: this.state.degree,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description,
    };
    this.props.addEducation(newEduData, this.props.history);
  }

  render() {
    const { err } = this.state;

    return (
      <div className="add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-secondary">
                {" "}
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any education you have had in the past or current
              </p>
              <small className="d-block pb-3">* = required fields</small>

              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  placeholder="* School/University"
                  name="school"
                  value={this.state.school}
                  onChange={this.handleChange}
                  err={err.school}
                />
                <TextFieldGroup
                  placeholder="* Degree"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.handleChange}
                  err={err.degree}
                />
                <TextFieldGroup
                  placeholder="* Field of Study"
                  name="fieldOfStudy"
                  value={this.state.fieldOfStudy}
                  onChange={this.handleChange}
                  err={err.fieldOfStudy}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={this.state.from}
                  onChange={this.handleChange}
                  err={err.from}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={this.state.to}
                  onChange={this.handleChange}
                  err={err.to}
                  disabled={this.state.disabled ? "disabled" : ""}
                />
                <div className="form-check mb4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="current"
                    value={this.state.current}
                    checked={this.state.current}
                    onChange={this.handleCheck}
                    id="current"
                  />
                  <label htmlFor="current" className="form-check-label">
                    Current School/University
                  </label>
                </div>
                <TextAreaFieldGroup
                  placeholder="Program Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  err={err.description}
                  info="Tell us about your study"
                />

                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                  value="Submit"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  err: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  err: state.err,
});

export default connect(mapStateToProps, { addEducation })(
  withRouter(AddEducation)
);
