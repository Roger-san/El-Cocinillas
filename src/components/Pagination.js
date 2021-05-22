import React, { Component } from "react"

export default class pagination extends Component {
  totalRecipes = Math.ceil(this.props.totalRecipes / 12)
  handleClick = (event) => {
    this.props.changePaginationPosition(event.target.id)
  }
  render() {
    return (
      <div className="navigation" aria-label="Page navigation">
        <ul className="pagination">
          {[...Array(this.totalRecipes)].map((x, i) => (
            <li
              key={`page-${i}`}
              id={`${i + 1}`}
              className={`page-item page${i + 1} ${
                this.props.pagePosition == i + 1 ? "active" : null
              }`}
              onClick={this.handleClick}
            >
              <a className="page-link" id={`${i + 1}`} href="#">
                {i + 1}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
