/* eslint-disable jsx-a11y/anchor-is-valid */
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
          <a data-toggle="modal" data-target="#staticBackdrop" href="#staticBackdrop">
            Login
          </a>
        )}
      </>
    )
  }
}
export default Dropdown
