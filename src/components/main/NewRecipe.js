/* eslint-disable no-fallthrough */
import React, { Component } from "react"
import Steps from "./Steps"
import Ingredients from "./Ingredients"
import InputType from "./InputType"

export default class NewRecipe extends Component {
  constructor() {
    super()
    this.state = {
      author: "",
      name: "",
      descripcion: String,
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
      default:
        console.log(data)
        break
    }
  }
  handleIngredientsQuantityChange = (event) => {
    if (event.target.className === "addQuantity") {
      this.setState({ ingredientsQuantity: this.state.ingredientsQuantity + 1 })
      console.log(this.state.ingredientsQuantity)
    }
    if (
      event.target.className === "deleteQuantity" &&
      this.state.ingredientsQuantity !== 1
    ) {
      this.setState({ ingredientsQuantity: this.state.ingredientsQuantity - 1 })
      console.log(this.state.ingredientsQuantity)
    }
  }
  handleStepsQuantityChange = (event) => {
    console.log("object")

    if (event.target.className === "addStep") {
      this.setState({ stepsQuantity: this.state.stepsQuantity + 1 })
      console.log(this.state.stepsQuantity)
    }
    if (event.target.className === "deleteStep" && this.state.stepsQuantity !== 1) {
      this.setState({ stepsQuantity: this.state.stepsQuantity - 1 })
      console.log(this.state.stepsQuantity)
    }
  }
  render() {
    return (
      <div>
        <InputType name_id="name">Nombre receta: </InputType>
        <InputType name_id="description">Descripcion: </InputType>

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
          Imagen principal: <input type="text" name="frontImage" id="frontImage" />
        </label>
        <button onClick="">send</button>
      </div>
    )
  }
}
