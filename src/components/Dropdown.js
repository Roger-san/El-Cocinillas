/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import UserMenu from "./UserMenu"
import LoginRegister from "./LoginRegister"
class Dropdown extends React.Component {
  render() {
    return (
      <div>
        {this.props.logged ? (
          <UserMenu handleChangePageState={this.props.handleChangePageState} />
        ) : (
          <LoginRegister />
        )}
      </div>
    )
  }
}
export default Dropdown
