/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"

class Logo extends React.Component {
  handleClick = (event) => {
    this.props.handleChangePageState(event)
  }
  render() {
    return (
      <div>
        <a className="navbar-brand" id="logo" href="#" onClick={this.handleClick}>
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    )
  }
}
export default Logo
