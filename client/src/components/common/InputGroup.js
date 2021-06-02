import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const InputGroup = ({
  name,
  placeholder,
  value,
  err,
  icon,
  type,
  onChange,
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <input
        className={classnames("form-control form-control-lg", {
          "is-invalid": err,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {err && <div className="invalid-feedback">{err}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  value: PropTypes.string.isRequired,
  err: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};

InputGroup.defaultProps = {
  type: "text",
};

export default InputGroup;
