import React, { Component } from "react"

export default class Steps extends Component {
  handleClick = (event) => {
    this.props.handleStepsQuantityChange(event)
  }
  handleChange = () => {
    const allSteps = Array.from(document.getElementsByClassName("steps")).map(
      (x) => x.value
    )
    this.props.handleValuesChange(allSteps, "steps")
  }

  render() {
    return (
      <div className="step">
        <label>
          Pasos:{" "}
          <input
            type="text"
            name="steps"
            className="steps"
            onChange={this.handleChange}
          />
          <button onClick={this.handleClick} className="addStep">
            +
          </button>
          <button onClick={this.handleClick} className="deleteStep">
            -
          </button>
        </label>
      </div>
    )
  }
}
