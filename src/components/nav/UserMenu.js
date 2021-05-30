import React, { Component } from "react"

export default class UserMenu extends Component {
  // open the user menu options or logout
  handleOnClick = (event) => {
    if (event.target.id === "logout") this.props.logOut(event)
    else this.props.changePage(event.target.id)
  }
  render() {
    return (
      <>
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
              {this.props.userData.author.split(" ")[0]}
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a
                className={`dropdown-item ${
                  this.props.userData.recipes.length ? null : "disabled"
                }`}
                href="#"
                id="authorRecipes"
                onClick={this.handleOnClick}
              >
                Recipes
              </a>
              <a
                className="dropdown-item"
                id="newRecipe"
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
      </>
    )
  }
}
