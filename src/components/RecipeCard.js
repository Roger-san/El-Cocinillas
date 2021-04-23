/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import hamburger from "../img/hamburger.jpg"
class RecipeCard extends React.Component {
  render() {
    return (
      <div className="card">
        <a href="#">
          <img src={hamburger} className="card-img-top" alt="hamburger" />
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the bulk of
              the card's content.
            </p>
          </div>
        </a>
      </div>
    )
  }
}
export default RecipeCard
