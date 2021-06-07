import React, { Component } from "react"

export default class Register extends Component {
  constructor() {
    super()
    this.state = { author: "", email: "", password: "" }
  }
  // saves the input values on the state
  handleOnChange = (event) => {
    const { id, value } = event.target
    this.setState({ [id]: value })
  }
  // post the form data if is a success closes the modal
  // else show a error message to the user
  handleSubmit = (event) => {
    event.preventDefault()
    const { author, email, password } = this.state
    const newUser = { author: author, email: email, password: password }
    const divErrorMesssage = document.getElementById("error-message")
    const LOCAL = "http://localhost:3001"
    const HEROKU = "https://elcocinillas-api.herokuapp.com"
    const URL = `${HEROKU}/api/user/register`
    const opts = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newUser)
    }
    fetch(URL, opts)
      .then((data) => data.json())
      .then((data) => {
        if (data.success) this.props.userLogged(data)
        if (!data.success && divErrorMesssage.classList.length === 0) {
          this.setState({
            message: data.message
          })
          divErrorMesssage.classList.toggle("display")
        }
      })
      .catch((err) => console.log(err))
  }
  render() {
    return (
      <>
        <div className="modal-header">
          <h1>Register</h1>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="author"
              id="author"
              max="20"
              className="form-control"
              onChange={this.handleOnChange}
              required
            />
          </label>
          <label>
            {" "}
            Email:
            <input
              type="email"
              name="email"
              id="email"
              max="40"
              placeholder="No need of a real Email"
              className="form-control"
              onChange={this.handleOnChange}
              required
            />
          </label>
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
          <div className="modal-footer register-modal-footer">
            <button type="submit" className="btn btn-primary">
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
        </form>
      </>
    )
  }
}
