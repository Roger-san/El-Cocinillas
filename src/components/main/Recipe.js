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
      .then((data) => {
        this.setState({ authorRecipes: data.data })
      })
  }

  giveIdName = () => {
    if (this.props.data.frontImage) {
      let imageName = this.props.data.frontImage.split("\\")
      imageName = imageName[imageName.length - 1]
      return imageName
    }
  }
  getImageData = () => {
    const imageName = this.props.data.frontImage
    if (this.props.data.frontImage) {
      const cloud = true
      const heroku = cloud
        ? "https://elcocinillas-api.herokuapp.com"
        : "http://localhost:3001"
      const URL = `${heroku}/api/recipe/image/${imageName}`
      console.log(imageName)
      fetch(URL)
        .then((data) => data.json())
        .then((data) => {
          if (data.success && data.data[0]) {
            const img = document.getElementById(imageName)
            if (img) {
              img.src = data.data[0].data
            }
          }
        })
    }
  }

  renderAuthorRecipes = () => {
    return this.state.authorRecipes.map((recipe, i) => (
      <RecipeCard
        key={`author-recipe-${i}`}
        position={i + 1}
        recipe={recipe}
        renderRecipe={this.props.renderRecipe}
        page={this.props.page}
      />
    ))
  }
  render() {
    return (
      <>
        <div id="top-secction">
          <img
            id={this.giveIdName()}
            className="recipe-image"
            src={this.getImageData() || hamburger}
            alt="hamburger"
          ></img>
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
                <span className="ingredients-span" key={`ingredient-qty-${i}`}>
                  {ingredient.quantity}{" "}
                </span>
                <span className="ingredients-span" key={`ingredient-name-${i}`}>
                  {ingredient.ingredient}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div id="steps-container">
          {this.props.data.steps.map((step, i) => (
            <div className="step-div" key={`step-${i}`}>
              <span className="step-span">Step {i + 1}: </span>
              <span>{step}</span>
            </div>
          ))}
        </div>
        {this.state.authorRecipes !== "" ? (
          <>
            <div className="author-recipes-container">
              <h3>More author recipes:</h3>
              <div className="author-recipes">{this.renderAuthorRecipes()}</div>
            </div>
          </>
        ) : undefined}
      </>
    )
  }
}
