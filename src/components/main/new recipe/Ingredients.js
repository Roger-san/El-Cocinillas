import React, { Component } from "react"

export default class Ingredients extends Component {
  // calls the handleListsQuantityChange to add or delete a li
  handleClick = (event) => {
    this.props.handleListsQuantityChange(event, this.props.position)
  }
  // saves all the ingredients data and sends it to the NewRecipe state
  handleChange = (event) => {
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
    this.props.saveList("ingredients", allIngredientsCuantity)
  }
  render() {
    return (
      <div className="ingredient-container">
        <div className="ingredient">
          <input
            type="text"
            name={`ingredient-${this.props.position + 1}`}
            value={this.props.values.ingredient}
            className="ingredient-name"
            onChange={this.handleChange}
            placeholder="Ingredient"
            minLength="3"
            maxLength="30"
            required
          />
          <input
            type="text"
            name={`quantity-${this.props.position + 1}`}
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
