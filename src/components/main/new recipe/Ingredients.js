import React, { Component } from "react"

export default class Ingredients extends Component {
  handleClick = (event) => {
    this.props.handleListsQuantityChange(event, this.props.position)
  }
  handleChange = () => {
    const allIngredients = [...document.getElementsByClassName("ingredient-name")].map(
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
      <div className="ingredient-container">
        <div className="ingredient">
          <input
            type="text"
            name="ingredient"
            value={this.props.values.ingredient}
            className="ingredient-name"
            onChange={this.handleChange}
            placeholder="Ingredient"
          />
          <input
            type="text"
            name="quantity"
            value={this.props.values.quantity}
            className="quantity"
            onChange={this.handleChange}
            placeholder="Quantity"
          />
        </div>
        <button onClick={this.handleClick} className="add-ingredient">
          +
        </button>
        <button onClick={this.handleClick} className="delete-ingredient">
          -
        </button>
      </div>
    )
  }
}
