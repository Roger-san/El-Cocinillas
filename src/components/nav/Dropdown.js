/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import UserMenu from "./UserMenu"
class Dropdown extends React.Component {
  render() {
    return (
      <div>
        {this.props.logged ? (
          <UserMenu
            handleLogOut={this.props.handleLogOut}
            handleChangePageState={this.props.handleChangePageState}
          />
        ) : (
          <a data-toggle="modal" data-target="#staticBackdrop" href="#staticBackdrop">
            Login
          </a>
        )}
      </div>
    )
  }
}
export default Dropdown
