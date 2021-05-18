/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"

class Logo extends React.Component {
  handleClick = () => {
    this.props.changePage("recipes")
    this.props.changePaginationPosition(1)
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
