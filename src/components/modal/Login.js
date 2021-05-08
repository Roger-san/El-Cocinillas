/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react"

export default class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: "",
      message: ""
    }
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const { email, password } = this.state
    const user = { email: email, password: password }
    const divErrorMesssage = document.getElementById("error-message")

    const cloud = false
    const heroku = cloud
      ? "https://elcocinillas-api.herokuapp.com"
      : "http://localhost:3001"
    const URL = `${heroku}/api/users/login`
    const opts = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user)
    }
    fetch(URL, opts)
      .then((data) => data.json())
      .then((data) => {
        if (data.success) this.props.userLogged(data)
        if (!data.success && divErrorMesssage.classList.length === 0) {
          this.setState({ message: data.message })
          document.getElementById("error-message").classList.toggle("display")
        }
        console.log(data)
      })
      .catch((err) => console.log(err))
  }
  handleOnChange = (event) => {
    const { id, value } = event.target
    if (id === "email") this.setState({ email: value })
    if (id === "password") this.setState({ password: value })
  }
  handleClick = (event) => {
    if (event.target.id === "register") this.props.handleChangeState()
    if (event.target.id === "close") {
      document.getElementById("email").value = ""
      document.getElementById("password").value = ""
      this.setState({ email: "", password: "" })
    }
  }
  render() {
    return (
      <>
        <div className="modal-header">
          <h1>Login</h1>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              id="email"
              max="40"
              className="form-control"
              onChange={this.handleOnChange}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              id="password"
              minLength="6"
              maxLength="16"
              className="form-control"
              onChange={this.handleOnChange}
              required
            />
          </label>
          <div id="error-message">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#D9212C"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"></path>
            </svg>
            {this.state.message}
          </div>
          <a onClick={this.handleClick} id="register" href="#">
            Register
          </a>
          <div className="modal-footer">
            <button type="submit" className="btn btn-primary">
              Send
            </button>
            <button
              id="close"
              onClick={this.handleClick}
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </form>
      </>
    )
  }
}
