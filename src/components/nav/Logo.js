import React from "react"

class Logo extends React.Component {
  // sends to the initial page (recipes page 1)
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
