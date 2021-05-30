import React, { Component } from "react"

export default class Searcher extends Component {
  constructor() {
    super()
    this.state = { inputValue: "" }
  }
  // saves the input data to state
  // if the input have the error class detele its
  handleChange = (event) => {
    this.setState({ inputValue: event.target.value })
    if ([...document.getElementById("searchInput").classList].includes("error"))
      document.getElementById("searchInput").classList.toggle("error")
  }
  // sends to the selected recipe page
  handleSubmit = (event) => {
    event.preventDefault()
    const LOCAL = "http://localhost:3001"
    const HEROKU = "https://elcocinillas-api.herokuapp.com"
    fetch(`${HEROKU}/api/recipe/${this.state.inputValue}`)
      .then((recipe) => recipe.json())
      .then((recipe) => {
        if (recipe.recipe) {
          document.getElementById("searchInput").value = ""
          this.setState({ inputValue: "" })
          this.props.renderRecipe(recipe.recipe)
        } else {
          if (![...document.getElementById("searchInput").classList].includes("error")) {
            document.getElementById("searchInput").classList.toggle("error")
          }
        }
      })
      .catch((err) => console.log(err))
  }
  // if the input value is higher or equal than 2
  // renders the datalist with all the recipes names
  createDataList = () => {
    if (this.state.inputValue.length >= 2) {
      return (
        <datalist id="search" onClick={this.handleClick}>
          {[...this.props.recipesNames].map((name, index) => (
            <option key={index} value={name} onClick={this.handleClick}></option>
          ))}
        </datalist>
      )
    }
  }

  render() {
    return (
      <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
        <input
          className="form-control mr-sm-2"
          type="search"
          list="search"
          name="search"
          id="searchInput"
          placeholder="Search"
          autoComplete="off"
          onChange={this.handleChange}
        ></input>
        {this.createDataList()}
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    )
  }
}
