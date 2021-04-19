import React, { Component } from "react"

export default class Ingredients extends Component {
  handleClick = (event) => {
    this.props.handleIngredientsQuantityChange(event)
  }
  handleChange = () => {
    const allIngredients = [...document.getElementsByClassName("ingredientName")].map(
      (x) => x.value
    )

    const allQuantity = [...document.getElementsByClassName("quantity")].map(
      (x) => x.value
    )
    const allIngredientsCuantity = allIngredients.map((ingredient, i) => ({
      ingredient: ingredient,
      quantity: allQuantity[i]
    }))
    this.props.handleValuesChange(allIngredientsCuantity, "ingredients")
  }
  render() {
    return (
      <div className="ingredient">
        <label>
          Ingredientes:{" "}
          <input
            type="text"
            name="ingredient"
            className="ingredientName"
            onChange={this.handleChange}
          />
        </label>

        <label>
          Cantidad:{" "}
          <input
            type="text"
            name="quantity"
            className="quantity"
            onChange={this.handleChange}
          />
          <button onClick={this.handleClick} className="addQuantity">
            +
          </button>
          <button onClick={this.handleClick} className="deleteQuantity">
            -
          </button>
        </label>
      </div>
    )
  }
}
