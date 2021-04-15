/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"

class Dropdown extends React.Component {
  render() {
    return (
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Login
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a class="dropdown-item" href="#">
                Config
              </a>
              <a class="dropdown-item" href="#">
                Recipes
              </a>
              <a class="dropdown-item" href="#">
                Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}
export default Dropdown
