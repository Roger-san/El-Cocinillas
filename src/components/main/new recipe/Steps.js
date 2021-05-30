import React, { Component } from "react"

export default class Steps extends Component {
  // calls the handleListsQuantityChange to add or delete a li
  handleClick = (event) => {
    this.props.handleListsQuantityChange(event, this.props.position)
  }
  // saves all the steps data and sends it to the NewRecipe state
  handleChange = (event) => {
    const allSteps = Array.from(document.getElementsByClassName("step")).map(
      (x) => x.value
    )
    this.props.saveList("steps", allSteps)
  }
  render() {
    return (
      <div className="step-container">
        <label className="step-label">{`Step ${this.props.position + 1}:  `}</label>
        <input
          type="text"
          name={`step-${this.props.position + 1}`}
          className="step"
          onChange={this.handleChange}
          value={this.props.value}
          minLength="5"
          maxLength="300"
          required
        />
        <button onClick={this.handleClick} className="add-step">
          +
        </button>
        <button onClick={this.handleClick} className="delete-step">
          -
        </button>
      </div>
    )
  }
}
