import React, { Component } from "react"

export default class Loading extends Component {
  render() {
    return (
      <div id="loading" className="alert alert-primary">
        <p>Conecting to database...</p>
      </div>
    )
  }
}
