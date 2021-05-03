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
      <div className="step-container">
        <label className="step-label">{`Step ${this.props.number + 1}:  `}</label>
        <input type="text" name="step" className="step" onChange={this.handleChange} />
        <button onClick={this.handleClick} className="add">
          +
        </button>
        <button onClick={this.handleClick} className="delete">
          -
        </button>
      </div>
    )
  }
}
