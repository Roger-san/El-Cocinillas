import RecipeCard from "../RecipeCard"
import React, { Component } from "react"

export default class Recipe extends Component {
  constructor() {
    super()
    this.state = { authorRecipes: "" }
  }
  componentDidMount = () => {
    const cloud = false
    const heroku = cloud
      ? "https://el-cocinillas-api.herokuapp.com"
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
        console.log(this.state)
      })
  }
  handleRenderAuthorRecipes = () => {
    console.log("asf", this.state.authorRecipes)
    return this.state.authorRecipes.map((recipe) => <RecipeCard recipe={recipe} />)
  }
  render() {
    return (
      <>
        <div>
          <p>Author: {this.props.data.author}</p>
          <p>Description: {this.props.data.description}</p>
          <div id="stepsContainer">
            {this.props.data.steps.map((step, i) => (
              <p key={`step-${i}`}>{step}</p>
            ))}
          </div>
          <div id="ingredientsContainer"></div>
          {this.props.data.ingredients.map((ingredient, i) => (
            <>
              <span key={`ingredient-qty-${i}`}>quantity: {ingredient.quantity} </span>
              <span key={`ingredient-name-${i}`}>
                ingredient: {ingredient.ingredient}{" "}
              </span>
            </>
          ))}
        </div>
        <div>
          {this.state.authorRecipes !== "" ? this.handleRenderAuthorRecipes() : undefined}
        </div>
      </>
    )
  }
}
