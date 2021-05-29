import React, { Component } from "react";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      password: "",
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
  handleSubmit(e) {
    const newUser = {
      name: this.state.name,
      password: this.state.password,
    };
    console.log(newUser);
    e.preventDefault();
  }

  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                <i className="fas fa-user"></i> Sign in to your DevConnect
                account
              </p>
              <form className="form" onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    minLength="6"
                  />
                </div>
                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                  value="Register"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
