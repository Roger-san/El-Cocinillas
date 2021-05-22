import RecipeCard from "../RecipeCard"
import React, { Component } from "react"
import emptyImage from "../../empty-image.jpg"

export default class Recipe extends Component {
  constructor() {
    super()
    this.state = { authorRecipes: "" }
  }
  componentDidMount = () => {
    // const LOCAL = "http://localhost:3001"
    const HEROKU = "https://elcocinillas-api.herokuapp.com"

    fetch(`${HEROKU}/api/user/authorRecipes/${this.props.data.author}`)
      .then((data) => data.json())
      .then((data) => {
        this.setState({ authorRecipes: data.data })
      })

    const imgElement = document.getElementById(this.props.data.frontImage)
    const imageName = this.props.data.frontImage
    if (imageName && imgElement) {
      if (!sessionStorage[imageName]) {
        fetch(`${HEROKU}/api/recipe/image/${imageName}`)
          .then((image) => image.json())
          .then((image) => {
            if (image.success) {
              console.log(image)
              imgElement.src = image.data
              sessionStorage[image.name] = image.data
            }
          })
      } else {
        imgElement.src = sessionStorage[imageName]
      }
    }
  }

  giveIdName = () => {
    if (this.props.data.frontImage) {
      let imageName = this.props.data.frontImage.split("\\")
      imageName = imageName[imageName.length - 1]
      return imageName
    }
  }
  getImageData = () => {}

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
            src={this.getImageData() || emptyImage}
            alt="emptyImage"
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
