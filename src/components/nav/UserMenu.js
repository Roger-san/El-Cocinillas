/* eslint-disable default-case */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react"

export default class UserMenu extends Component {
  handleOnClick = (event) => {
    if (event.target.id === "logout") this.props.handleLogOut(event)
    else this.props.handleChangePageState(event)
  }
  render() {
    return (
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              User
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              {/* <a
                className="dropdown-item"
                href="#"
                id="config"
                onClick={this.handleOnClick}
              >
                Config
              </a> */}
              <a
                className="dropdown-item"
                href="#"
                id="authorRecipes"
                onClick={this.handleOnClick}
              >
                Recipes
              </a>
              <a
                className="dropdown-item"
                id="create-recipe"
                href="#"
                onClick={this.handleOnClick}
              >
                Create recipe
              </a>
              <a
                className="dropdown-item"
                id="logout"
                href="#"
                onClick={this.handleOnClick}
              >
                Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}
