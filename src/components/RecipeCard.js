/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import hamburger from "../hamburger.jpg"
class RecipeCard extends React.Component {
  handleClick = () => {
    this.props.renderRecipe(this.props.recipe)
  }
  render() {
    return (
      <div
        className={`card`}
        id={`recipe-${this.props.position + 1}`}
        onClick={this.handleClick}
      >
        <div className="img-wrapper">
          <img src={hamburger} className="card-img-top" alt="recipe img" />
        </div>
        <div className="card-body">
          <h5 className="card-title">
            {this.props.recipe ? this.props.recipe.recipeName : "Card title"}
          </h5>
          <p className="card-text">
            {this.props.recipe
              ? this.props.recipe.description
              : "Some quick example text to build on the card title and make up the bulk of the card's content."}
          </p>
          {this.props.recipe ? (
            <p className="card-author">By {this.props.recipe.author}</p>
          ) : undefined}
        </div>
      </div>
    )
  }
}
export default RecipeCard
