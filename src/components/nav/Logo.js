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
          El cocinillas
        </a>
      </div>
    )
  }
}
export default Logo
