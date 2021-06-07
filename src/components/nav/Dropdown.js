import React from "react"
import UserMenu from "./UserMenu"
class Dropdown extends React.Component {
  render() {
    return (
      <>
        {this.props.logged ? (
          <UserMenu
            logOut={this.props.logOut}
            changePage={this.props.changePage}
            userData={this.props.userData}
          />
        ) : (
          <a
            id="login"
            data-toggle="modal"
            data-target="#staticBackdrop"
            href="#staticBackdrop"
          >
            Login
          </a>
        )}
      </>
    )
  }
}
export default Dropdown
