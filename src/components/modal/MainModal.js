import React, { Component } from "react"
import Login from "./Login"
import Register from "./Register"
export default class MainModal extends Component {
  constructor() {
    super()
    this.state = { login: true }
  }
  // changes the state if the user login successfully
  // changing the login for the user menu
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
                userLogged={this.props.userLogged}
              />
            ) : (
              <Register
                handleChangeState={this.handleChangeState}
                userLogged={this.props.userLogged}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}
