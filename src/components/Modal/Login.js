/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react"

export default class Login extends Component {
  handleClick = () => {
    this.props.handleChangeState()
  }
  handleFetch = () => {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    this.props.handleUserLogin(email, password)
  }
  render() {
    return (
      <>
        <div className="modal-header">
          <h1>Login</h1>
        </div>
        <div className="form-group">
          <label> Email: </label>
          <input type="email" name="email" id="email" max="40" className="form-control" />
        </div>
        <div className="form-group">
          <label>
            Password:{" "}
            <input
              type="password"
              name="password"
              id="password"
              minLength="6"
              maxLength="16"
              className="form-control"
            />
          </label>
        </div>
        <a onClick={this.handleClick} href="#">
          Register
        </a>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={this.handleFetch}>
            Send
          </button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
        </div>
      </>
    )
  }
}
//
