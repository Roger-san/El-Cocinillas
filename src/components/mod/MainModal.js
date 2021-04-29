import React, { Component } from "react"
import Login from "./Login"
import Register from "./Register"

export default class MainModal extends Component {
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
              <Login handleLoggedState={this.props.handleLoggedState} />
            ) : (
              <Register handleLoggedState={this.props.handleLoggedState} />
            )}
          </div>
        </div>
      </div>
    )
  }
}
