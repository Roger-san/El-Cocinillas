/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import UserMenu from "./UserMenu"
import LoginRegister from "./LoginRegister"
class Dropdown extends React.Component {
  render() {
    return <div>{this.props.logged ? <UserMenu /> : <LoginRegister />}</div>
  }
}
export default Dropdown
