/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react"

export default class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: ""
    }
  }
  handleClick = () => {
    this.props.handleChangeState()
  }
  handleOnChange = (event) => {
    const { id, value } = event.target
    if (id === "email") this.setState({ email: value })
    if (id === "password") this.setState({ password: value })
  }
  // handleUserLogin = () => {
  //   const { email, password } = this.state
  //   const user = { email: email, password: password }
  //   const cloud = true
  //   const heroku = cloud
  //     ? "https://el-cocinillas-api.herokuapp.com"
  //     : "http://localhost:3001"
  //   const URL = `${heroku}/api/users/login`
  //   const opts = {
  //     method: "POST",
  //     headers: { "content-type": "application/json" },
  //     body: JSON.stringify(user)
  //   }
  //   fetch(URL, opts)
  //     .then((data) => data.json())
  //     .then((data) => {
  //       this.props.handleLoggedState(data)
  //     })
  //     .catch((err) => console.log(err))
  // }
  render() {
    return (
      <>
        <div className="modal-header">
          <h1>Login</h1>
        </div>
        <div className="form-group">
          <label> Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            max="40"
            className="form-control"
            onChange={this.handleOnChange}
          />
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
              onChange={this.handleOnChange}
            />
          </label>
        </div>
        <a onClick={this.handleClick} href="#">
          Register
        </a>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleUserLogin}
          >
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
