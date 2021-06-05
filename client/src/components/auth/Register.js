import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../action/authActions";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      err: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.err) {
      // if error is included
      this.setState({ err: nextProps.err });
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleSubmit(e) {
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.registerUser(newUser, this.props.history);
    e.preventDefault();
  }

  render() {
    const { err } = this.state;
    const { user } = this.props.auth;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                <i className="fas fa-user"></i> Create Your Account
              </p>
              <form className="form" noValidate onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  err={err.name}
                />
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  err={err.email}
                  type="email"
                  info="This site uses Gravatar so if you want a profile image, use
                    a Gravatar email"
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  err={err.password}
                  type="password"
                />
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.handleChange}
                  err={err.password2}
                  type="password"
                />
                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                  value="Register"
                />
              </form>
              <p className="my-1 text-center mt-4">
                Already have an account? <a href="login.html">Sign In</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  err: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  err: state.err,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));

// import React, { useState } from "react";

// function Register() {
//   const initialFormState = {
//     name: "",
//     email: "",
//     password: "",
//     password2: "",
//   };

//   const [form, setForm] = useState(initialFormState);

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setForm(() => {
//       return { [name]: value };
//     });
//   }

//   return (
//     <div className="register">
//       <div className="container">
//         <div className="row">
//           <div className="col-md-8 m-auto">
//             <h1 className="display-4 text-center">Sign Up</h1>
//             <p className="lead text-center">
//               <i className="fas fa-user"></i> Create Your Account
//             </p>
//             <form className="form" action="create-profile.html">
//               <div className="form-group">
//                 <input
//                   type="text"
//                   className="form-control form-control-lg"
//                   placeholder="Name"
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="form-group">
//                 <input
//                   type="email"
//                   className="form-control form-control-lg"
//                   placeholder="Email Address"
//                   value={form.email}
//                   name="email"
//                   onChange={handleChange}
//                 />
//                 <small className="form-text text-muted">
//                   This site uses Gravatar so if you want a profile image, use a
//                   Gravatar email
//                 </small>
//               </div>
//               <div className="form-group">
//                 <input
//                   className="form-control form-control-lg"
//                   type="password"
//                   placeholder="Password"
//                   name="password"
//                   value={form.password}
//                   onChange={handleChange}
//                   minLength="6"
//                 />
//               </div>
//               <div className="form-group">
//                 <input
//                   className="form-control form-control-lg"
//                   type="password"
//                   placeholder="Confirm Password"
//                   name="password2"
//                   value={form.password2}
//                   onChange={handleChange}
//                   minLength="6"
//                 />
//               </div>
//               <input
//                 type="submit"
//                 className="btn btn-info btn-block mt-4"
//                 value="Register"
//               />
//             </form>
//             <p className="my-1 text-center mt-4">
//               Already have an account? <a href="login.html">Sign In</a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
