import SeachBar from "./components/nav/SearchBar"
import Logo from "./components/nav/Logo"
import Modal from "./components/modal/Modal"
import RecipeCard from "./components/RecipeCard"
import Dropdown from "./components/nav/Dropdown"
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
      const heroku = cloud
        ? "https://el-cocinillas-api.herokuapp.com"
        : "http://localhost:3001"
      const URL = `${heroku}/api/users/token`
      const opts = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(token)
      }
      fetch(URL, opts)
        .then((data) => data.json())
        .then((data) => {
          console.log("token login", data)
          if (data) this.handleLoggedState(data)
        })
        .catch((data) => console.error(data))
    }
  }
  handleChangeUserData = (userData) => {
    this.setState({ userData: userData.data })
    console.log("New state", userData.data)
  }
  handleLogOut = () => {
    if (localStorage.token_el_cocinillas) localStorage.removeItem("token_el_cocinillas")
    this.setState({ logged: false })
  }
  handleLoggedState = (data) => {
    this.setState({ logged: true, userData: data.authorData })
    if (document.getElementsByClassName("modal-backdrop").length !== 0) {
      const modal = document.getElementsByClassName("modal-backdrop")
      modal.forEach((element) => {
        element.style.visibility = "hidden"
      })
    }
    // if (document.getElementsByClassName("modal-open").length !== 0) {
    //   const modal = document.getElementsByClassName("modal-open")
    //   modal[0].style.visibility = "hidden"
    // }
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
    if (this.state.page === "newRecipe" && this.state.logged)
      return (
        <div className="container">
          <NewRecipe
            userData={this.state.userData}
            handleChangeUserData={this.handleChangeUserData}
          />
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
            handleLogOut={this.handleLogOut}
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
