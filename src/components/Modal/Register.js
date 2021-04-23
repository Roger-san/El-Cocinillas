/* eslint-disable default-case */
import React, { Component } from "react"

export default class Register extends Component {
  constructor() {
    super()
    this.state = { author: "", email: "", password: "" }
  }
  handleOnChange = (event) => {
    const { id, value } = event.target
    switch (id) {
      case "author":
        this.setState({ author: value })
        break
      case "email":
        this.setState({ email: value })
        break
      case "password":
        this.setState({ password: value })
        break
    }
  }
  handleFetch = () => {
    const { author, email, password } = this.state
    const newUser = { author: author, email: email, password: password }
    const URL = "http://localhost:3001/api/users/register"
    const opts = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newUser)
    }
    fetch(URL, opts)
      .then((data) => data.json())
      .then((data) => {
        localStorage.token_el_cocinillas = data.token
        this.props.handleUserLogin(author, email)
      })
      .catch((err) => console.log(err))
  }
  handleClose = () => {}
  render() {
    return (
      <>
        <div className="modal-header">
          <h1>Register</h1>
        </div>
        <form>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              name="author"
              id="author"
              max="40"
              className="form-control"
              onChange={this.handleOnChange}
            />
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
          </div>{" "}
        </form>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={this.handleClick}>
            Send
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            onClick={this.props.handleChangeState}
          >
            Close
          </button>
        </div>
      </>
    )
  }
}
