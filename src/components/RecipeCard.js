/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import hamburger from "../img/hamburger.jpg"
class RecipeCard extends React.Component {
  handleClick = () => {
    this.props.handleRenderRecipe(this.props.recipe)
  }
  render() {
    return (
      <div className="card" onClick={this.handleClick}>
        <img
          // {this.props.recipe ? this.props.recipe.frontImage : hamburger}
          src={hamburger}
          className="card-img-top"
          alt="recipe img"
        />
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
