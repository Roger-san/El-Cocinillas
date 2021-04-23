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
    this.state = { logged: false, page: "recipes" }
  }
  componentDidMount = () => {
    if (localStorage.token_el_cocinillas) {
      const token = { token: localStorage.token_el_cocinillas }
      const URL = "http://localhost:3001/api/users/token"
      const opts = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(token)
      }
      fetch(URL, opts)
        .then((data) => data.json())
        .then((data) => console.log(data))
        .catch((data) => console.log(data))
    }
  }
  handleUserLogin = (email, password) => {
    console.log(email, password)
    const user = { email: email, password: password }
    const URL = "http://localhost:3001/api/users/login"
    const opts = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(user)
    }
    fetch(URL, opts)
      .then((data) => data.json())
      .then((data) => {
        localStorage.token_el_cocinillas = data.token
        const modal = document.getElementsByClassName("modal-backdrop")
        modal[0].style.visibility = "hidden"
        this.setState({ logged: true })
        console.log("asdas")
      })
      .catch((err) => console.log(err))
  }
  handleClick = (event) => {
    console.log(event)
    if (event.target.id === "newRecipe")
      this.state.page !== "newRecipe"
        ? this.setState({ page: "newRecipe" })
        : this.setState({ page: "recipes" })
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
          <NewRecipe />
        </div>
      )
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Logo />
          <SeachBar />
          <button onClick={this.handleClick} id="newRecipe">
            New Recipe
          </button>
          <Dropdown logged={this.state.logged} />
        </nav>
        {this.renderContainer()}
        <Footer />
        {this.state.logged ? undefined : <Modal handleUserLogin={this.handleUserLogin} />}
      </div>
    )
  }
}
