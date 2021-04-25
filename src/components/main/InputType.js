import React, { Component } from "react"

export default class InputType extends Component {
  handleChange = (event) => {
    this.props.handleValuesChange(event.target.value, this.props.name_id)
  }
  render() {
    return (
      <label>
        {this.props.children}
        <input
          type="text"
          name={this.props.name_id}
          id={this.props.name_id}
          onChange={this.handleChange}
        />
      </label>
    )
  }
}
