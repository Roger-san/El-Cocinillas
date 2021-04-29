/* eslint-disable default-case */
/* eslint-disable no-fallthrough */
import React, { Component } from "react"
import Steps from "./Steps"
import Ingredients from "./Ingredients"
import InputType from "./InputType"

export default class NewRecipe extends Component {
  constructor(props) {
    super()
    this.state = {
      author: props.userData.author,
      recipeName: "",
      description: String,
      ingredients: [""],
      steps: [""],
      frontImage: "",
      ingredientsQuantity: 1,
      stepsQuantity: 1
    }
  }
  handleValuesChange = (data, type) => {
    switch (type) {
      case "steps":
        this.setState({ steps: data })
        break
      case "ingredients":
        this.setState({ ingredients: data })
        break
      case "author":
        this.setState({ author: data })
        break
      case "recipeName":
        this.setState({ recipeName: data })
        break
      case "description":
        this.setState({ description: data })
        break
    }
  }
  handleIngredientsQuantityChange = (event) => {
    if (event.target.className === "addQuantity") {
      this.setState({ ingredientsQuantity: this.state.ingredientsQuantity + 1 })
    }
    if (
      event.target.className === "deleteQuantity" &&
      this.state.ingredientsQuantity !== 1
    ) {
      this.setState({ ingredientsQuantity: this.state.ingredientsQuantity - 1 })
    }
  }
  handleStepsQuantityChange = (event) => {
    if (event.target.className === "addStep") {
      this.setState({ stepsQuantity: this.state.stepsQuantity + 1 })
    }
    if (event.target.className === "deleteStep" && this.state.stepsQuantity !== 1) {
      this.setState({ stepsQuantity: this.state.stepsQuantity - 1 })
    }
  }
  handleFetch = () => {
    const { author, recipeName, description, ingredients, steps, frontImage } = this.state
    const newRecipe = {
      author: author,
      recipeName: recipeName,
      description: description,
      ingredients: ingredients,
      steps: steps,
      frontImage: frontImage
    }
    const userData = this.props.userData
    userData.recipes.push(newRecipe)
    const cloud = true
    const heroku = cloud
      ? "https://el-cocinillas-api.herokuapp.com"
      : "http://localhost:3001"
    const URL = `${heroku}/api/users/new-recipe`
    const opts = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ newRecipe: newRecipe, userData: userData })
    }
    fetch(URL, opts)
      .then((data) => data.json())
      .then((data) => {
        console.log("recipe registred", data)
        this.props.handleChangeUserData(data)
      })
      .catch((err) => console.log(err))
  }
  render() {
    return (
      <div>
        <label>
          Author name:{" "}
          <input
            type="text"
            name={this.props.name_id}
            id={this.props.name_id}
            value={this.props.userData.author}
            readOnly
          />
        </label>
        <InputType handleValuesChange={this.handleValuesChange} name_id="recipeName">
          Recipe name:{" "}
        </InputType>
        <InputType handleValuesChange={this.handleValuesChange} name_id="description">
          Description:{" "}
        </InputType>

        <div id="stepsContainer">
          {[...Array(this.state.stepsQuantity)].map((x, i) => (
            <Steps
              key={`step-${i - 1}`}
              handleStepsQuantityChange={this.handleStepsQuantityChange}
              handleValuesChange={this.handleValuesChange}
            />
          ))}
        </div>
        <div id="ingredientsContainer">
          {[...Array(this.state.ingredientsQuantity)].map((x, i) => (
            <Ingredients
              key={`ingredient-${i - 1}`}
              handleIngredientsQuantityChange={this.handleIngredientsQuantityChange}
              handleValuesChange={this.handleValuesChange}
            />
          ))}
        </div>

        <label>
          Image: <input type="text" name="frontImage" id="frontImage" />
        </label>
        <button onClick={this.handleFetch}>send</button>
      </div>
    )
  }
}
