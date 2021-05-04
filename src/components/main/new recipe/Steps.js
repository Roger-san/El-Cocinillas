import React, { Component } from "react"

export default class Steps extends Component {
  handleClick = (event) => {
    this.props.handleListsQuantityChange(event, this.props.position)
  }
  handleChange = () => {
    const allSteps = Array.from(document.getElementsByClassName("step")).map(
      (x) => x.value
    )
    this.props.handleValuesChange(allSteps, "steps")
  }
  render() {
    return (
      <div className="step-container">
        <label className="step-label">{`Step ${this.props.position + 1}:  `}</label>
        <input
          type="text"
          name="step"
          className="step"
          onChange={this.handleChange}
          value={this.props.value}
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
