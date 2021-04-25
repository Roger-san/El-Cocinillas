import React, { Component } from "react"
import Login from "./Login"
import Register from "./Register"

export default class Modal extends Component {
  constructor() {
    super()
    this.state = { login: true }
  }
  handleChangeState = () => {
    this.setState({ login: !this.state.login })
  }
  render() {
    return (
      <div className="modal fade" id="staticBackdrop" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            {this.state.login ? (
              <Login
                handleChangeState={this.handleChangeState}
                handleLoggedState={this.props.handleLoggedState}
              />
            ) : (
              <Register
                handleChangeState={this.handleChangeState}
                handleLoggedState={this.props.handleLoggedState}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}
