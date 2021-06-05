import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteEducation } from "../../action/profileAction";

class Education extends Component {
  handleDeleteClick(eduID) {
    this.props.deleteEducation(eduID);
  }

  render() {
    const education = this.props.education.map((edu) => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.degree}</td>
        <td>{edu.fieldOfStudy}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
          {/* if current: display 'Now' */}
          {edu.to === null ? (
            " Now"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={this.handleDeleteClick.bind(this, edu._id)}
          >
            Delete Experience
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Your Education</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Degree</th>
              <th>Field Of Study</th>
              <th>Years</th>
              <th></th>
            </tr>
            {education}
          </thead>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
