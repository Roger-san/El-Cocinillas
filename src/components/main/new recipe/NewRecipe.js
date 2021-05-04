/* eslint-disable default-case */
/* eslint-disable no-fallthrough */
import React, { Component } from "react"
import Steps from "./Steps"
import Ingredients from "./Ingredients"

export default class NewRecipe extends Component {
  constructor(props) {
    super()
    this.state = {
      author: props.userData.author,
      recipeName: "",
      description: String,
      ingredients: [
        ["", ""],
        ["", ""]
      ],
      steps: ["", ""],
      frontImage: ""
    }
  }
  handleValuesChange = (data, type) => {
    switch (type) {
      case "recipe-name":
        this.setState({ recipeName: data })
        break
      case "description":
        this.setState({ description: data })
        break
      case "ingredients":
        this.setState({ ingredients: data })
        break
      case "steps":
        this.setState({ steps: data })
        break
    }
  }

  handleListsQuantityChange = (event, position) => {
    switch (event.target.className) {
      case "add-ingredient":
        return this.setState({
          ingredientsQuantity: this.state.ingredients.push(["", ""])
        })

      case "add-step":
        return this.setState({ stepsQuantity: this.state.steps.push("") })

      case "delete-ingredient":
        if (this.state.ingredients.length !== 1) {
          const data = [...this.state.ingredients]
          data.splice(position, 1)
          console.log("data", data)

          this.setState({ ingredients: data })
          console.log("state", this.state.ingredients)
        }

      case "delete-step":
        if (this.state.steps.length !== 1) {
          let data = [...this.state.steps]
          data.splice(position, 1)
          this.setState({ steps: data })
        }
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
      ? "https://elcocinillas-api.herokuapp.com"
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
        if (data.success) {
          this.props.handleChangeUserData(data)
          this.props.handleRenderRecipe(data.data.recipes[data.data.recipes.length - 1])
        }
      })
      .catch((err) => console.log(err))
  }
  handleChange = (event) => {
    this.handleValuesChange(event.target.value, event.target.id)
  }
  render() {
    return (
      <div>
        <input
          type="text"
          name="recipeName"
          id="recipe-name"
          onChange={this.handleChange}
          placeholder="Recipe name"
        />

        {/* poner un max de letras que se vea */}
        <textarea
          placeholder="Description"
          id="description"
          name="description"
          rows="4"
          cols="50"
          onChange={this.handleChange}
        ></textarea>

        <div id="ingredients-container">
          {this.state.ingredients.map((values, i) => (
            <Ingredients
              values={values}
              position={i}
              key={`ingredient-${i}`}
              handleListsQuantityChange={this.handleListsQuantityChange}
              handleValuesChange={this.handleValuesChange}
            />
          ))}
        </div>
        <div id="steps-container">
          {this.state.steps.map((value, i) => (
            <Steps
              value={value}
              position={i}
              key={`step-${i}`}
              handleListsQuantityChange={this.handleListsQuantityChange}
              handleValuesChange={this.handleValuesChange}
            />
          ))}
        </div>
        <div id="file-image-container">
          <label id="file-button">
            Add image
            <input
              type="file"
              name="fileImage"
              id="fileImage"
              accept="image/*"
              capture="camera"
            />
          </label>{" "}
        </div>
        <button onClick={this.handleFetch}>send</button>
      </div>
    )
  }
}
