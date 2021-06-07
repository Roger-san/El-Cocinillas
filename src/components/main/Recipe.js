import RecipeCard from "../RecipeCard"
import React, { Component } from "react"
import emptyImage from "../../empty-image.jpg"
import FastAverageColor from "fast-average-color"

export default class Recipe extends Component {
  constructor() {
    super()
    this.state = { authorRecipes: "" }
  }
  // takes all the author recipes and save them into
  // the state then render the img
  componentDidMount = () => {
    const LOCAL = "http://localhost:3001"
    const HEROKU = "https://elcocinillas-api.herokuapp.com"
    fetch(`${LOCAL}/api/user/authorRecipes/${this.props.data.author}`)
      .then((data) => data.json())
      .then((data) => {
        this.setState({ authorRecipes: data.data })
        this.renderImg()
        this.changeBackgroundColor()
      })
  }
  // if the user loads other recipe this function helps
  // changing the image
  componentDidUpdate = (oldProps) => {
    if (this.props.data.frontImage !== oldProps.data.frontImage) {
      console.log("object")
      this.renderImg()
      this.changeBackgroundColor()
    }
  }
  // get the primary color of the img and sets the background color
  // of body
  changeBackgroundColor = () => {
    const fac = new FastAverageColor()
    fac
      .getColorAsync(document.querySelector("img"))
      .then((color) => {
        color = color.rgba.replace(",1)", ",0.25)")
        document.body.style.backgroundColor = color
      })
      .catch((e) => {
        console.log(e)
      })
    fac.destroy()
  }
  // dowload and save the data of the img in sesion
  // storage (for future uses) and before that render it
  renderImg = () => {
    const LOCAL = "http://localhost:3001"
    const HEROKU = "https://elcocinillas-api.herokuapp.com"
    const imgElement = document.getElementById(this.props.data.frontImage)
    const imageName = this.props.data.frontImage
    if (imageName && imgElement) {
      if (!sessionStorage[imageName]) {
        fetch(`${LOCAL}/api/recipe/image/${imageName}`)
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
  // helps to create a unique id name using the index of the
  // recipe
  giveIdName = () => {
    if (this.props.data.frontImage) {
      let imageName = this.props.data.frontImage.split("\\")
      imageName = imageName[imageName.length - 1]
      return imageName
    }
  }
  // get all the author recipes to render on the bottom page
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
            src={emptyImage}
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
