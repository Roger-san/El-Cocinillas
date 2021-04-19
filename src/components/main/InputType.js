import React, { Component } from "react"

export default class InputType extends Component {
  render() {
    return (
      <label>
        {this.props.children}
        <input type="text" name={this.props.name_id} id={this.props.name_id} />
      </label>
    )
  }
}
