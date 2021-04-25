import SeachBar from "./components/SearchBar"
import Logo from "./components/Logo"
import Modal from "./components/Modal/Modal"
import RecipeCard from "./components/RecipeCard"
import Dropdown from "./components/Dropdown"
import Footer from "./components/Footer"
import NewRecipe from "./components/main/NewRecipe"
import React, { Component } from "react"

export default class App extends Component {
  constructor() {
    super()
    this.state = { logged: false, page: "recipes", userData: "" }
  }
  componentDidMount = () => {
    if (localStorage.token_el_cocinillas) {
      const token = { token: localStorage.token_el_cocinillas }
      const cloud = false
      const heroku = cloud ? "" : "http://localhost:3001"
      const URL = `${heroku}/api/users/token`
      const opts = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(token)
      }
      fetch(URL, opts)
        .then((data) => data.json())
        .then((data) => {
          if (data) this.handleLoggedState(data)
        })
        .catch((data) => console.error(data))
    }
  }
  handleLoggedState = (data) => {
    if (document.getElementsByClassName("modal-backdrop").length !== 0) {
      const modal = document.getElementsByClassName("modal-backdrop")
      modal[0].style.visibility = "hidden"
    }
    this.setState({ logged: true, userData: data.authorData })
    console.log(this.state)
  }
  handleChangePageState = (event) => {
    if (event.target.id === "create-recipe")
      this.state.page !== "newRecipe"
        ? this.setState({ page: "newRecipe" })
        : this.setState({ page: "recipes" })
    if (event.target.id === "logo") this.setState({ page: "recipes" })
  }
  renderContainer = () => {
    if (this.state.page === "recipes")
      return (
        <div className="container">
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
          <RecipeCard />
        </div>
      )
    if (this.state.page === "newRecipe")
      return (
        <div className="container">
          <NewRecipe userData={this.state.userData} />
        </div>
      )
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Logo handleChangePageState={this.handleChangePageState} />
          <SeachBar />
          <Dropdown
            logged={this.state.logged}
            handleChangePageState={this.handleChangePageState}
          />
        </nav>
        {this.renderContainer()}
        <Footer />
        {this.state.logged ? undefined : (
          <Modal handleLoggedState={this.handleLoggedState} />
        )}
      </div>
    )
  }
}
