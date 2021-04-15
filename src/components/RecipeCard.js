/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import hamburger from "../img/hamburger.jpg"
class RecipeCard extends React.Component {
  render() {
    return (
      <div class="card">
        <img src={hamburger} class="card-img-top" alt="hamburger" />
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up the bulk of the
            card's content.
          </p>
          <a href="#" class="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    )
  }
}
export default RecipeCard
