import RecipeCard from "../RecipeCard"
import React, { Component } from "react"
import hamburger from "../../hamburger.jpg"

export default class Recipe extends Component {
  constructor() {
    super()
    this.state = { authorRecipes: "" }
  }
  componentDidMount = () => {
    const cloud = true
    const heroku = cloud
      ? "https://elcocinillas-api.herokuapp.com"
      : "http://localhost:3001"
    const URL = `${heroku}/api/users/authorRecipes`
    const opts = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ author: this.props.data.author })
    }
    fetch(URL, opts)
      .then((data) => data.json())
      .then((data) => this.setState({ authorRecipes: data.data }))
  }
  handleRenderAuthorRecipes = () => {
    return this.state.authorRecipes.map((recipe, i) => (
      <RecipeCard
        renderRecipe={this.props.renderRecipe}
        key={`author-recipe-${i}`}
        recipe={recipe}
      />
    ))
  }
  render() {
    return (
      <>
        <div id="top-secction">
          <img className="recipe-image" src={hamburger} alt="hamburger"></img>
          <div id="name-description-container">
            <h2>{this.props.data.recipeName}</h2>
            <h4>{this.props.data.description}</h4>
          </div>
        </div>
        <div id="ingredients-container">
          <h4>Ingredients</h4>
          <ul>
            {this.props.data.ingredients.map((ingredient, i) => (
              <li key={`ingredient-${i}`}>
                <span key={`ingredient-qty-${i}`}>{ingredient.quantity} </span>
                <span key={`ingredient-name-${i}`}>{ingredient.ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
        <div id="steps-container">
          {this.props.data.steps.map((step, i) => (
            <div key={`step-${i}`}>
              <span className="step-span">Step {i + 1}: </span>
              <span>{step}</span>
            </div>
          ))}
        </div>
        {this.state.authorRecipes !== "" ? (
          <>
            <div className="author-recipes-container">
              <h3>More author recipes:</h3>
              <div className="author-recipes">{this.handleRenderAuthorRecipes()}</div>
            </div>
          </>
        ) : undefined}
      </>
    )
  }
}
