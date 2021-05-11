/* eslint-disable default-case */
import React, { Component } from "react"
import Steps from "./Steps"
import Ingredients from "./Ingredients"

export default class NewRecipe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      author: props.userData.author,
      recipeName: "",
      description: "",
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
      case "fileImage":
        const image = data.split("\\")
        this.setState({ frontImage: image[image.length - 1] })
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
          this.setState({ ingredients: data })
        }
        break
      case "delete-step":
        if (this.state.steps.length !== 1) {
          let data = [...this.state.steps]
          data.splice(position, 1)
          this.setState({ steps: data })
        }
        break
    }
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const cloud = false
    const heroku = cloud
      ? "https://elcocinillas-api.herokuapp.com"
      : "http://localhost:3001"

    if (document.querySelector("input[type=file]").files[0]) {
      const formData = new FormData()
      formData.append("image", document.querySelector("input[type=file]").files[0])
      const URL1 = `${heroku}/api/recipe/new-picture`
      const opts1 = {
        method: "POST",
        body: formData
      }
      fetch(URL1, opts1)
        .then((data) => data.json())
        .then((data) => {
          console.log(data)
        })
        .catch((err) => console.log(err))
    }

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
    const URL2 = `${heroku}/api/recipe/new-recipe`
    const opts2 = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ newRecipe: newRecipe, userData: userData })
    }
    fetch(URL2, opts2)
      .then((data) => data.json())
      .then((data) => {
        if (data.success) {
          this.props.changeUserData(data)
          document.location.href = "/"
        }
      })
      .catch((err) => console.log(err))
  }
  handleChange = (event) => {
    if (
      event.target.id === "fileImage" &&
      document.querySelector("input[type=file]").files[0]
    ) {
      window.URL = window.URL || window.webkitURL
      const preview = document.getElementById("preview")
      const file = document.querySelector("input[type=file]").files[0]
      preview.classList.toggle("width")
      preview.src = window.URL.createObjectURL(file)
      preview.onload = () => {
        window.URL.revokeObjectURL(this.src)
      }
      // return this.handleValuesChange(file.name.split("\\"), event.target.id)
    }
    this.handleValuesChange(event.target.value, event.target.id)
  }
  render() {
    return (
      <form id="new-recipe-form" onSubmit={this.handleSubmit}>
        <div id="top-form">
          <img
            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            id="preview"
            alt="preview"
          ></img>
          <div id="top-div">
            <input
              type="text"
              name="recipeName"
              id="recipe-name"
              onChange={this.handleChange}
              placeholder="Recipe name"
              minLength="3"
              maxLength="40"
              required
            />
            <textarea
              placeholder="Description"
              id="description"
              name="description"
              rows="5"
              onChange={this.handleChange}
              maxLength="150"
            ></textarea>
          </div>
        </div>
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
        <div id="form-bottom">
          <label id="file-button">
            Add image
            <input
              type="file"
              accept="image/*"
              id="fileImage"
              capture="camera"
              onChange={this.handleChange}
            />
          </label>
          <button id="form-button" type="submit">
            Send
          </button>
        </div>
      </form>
    )
  }
}
