/* eslint-disable default-case */
import SeachBar from "./components/nav/SearchBar"
import Logo from "./components/nav/Logo"
import RecipeCard from "./components/RecipeCard"
import MainModal from "./components/MainModal"
import Dropdown from "./components/nav/Dropdown"
import Footer from "./components/Footer"
import NewRecipe from "./components/main/NewRecipe"
import React, { Component } from "react"

export default class App extends Component {
  constructor() {
    super()
    this.state = { logged: "", page: "loadingRecipes", userData: "", renderedRecipes: [] }
  }
  componentDidMount = () => {
    const cloud = true
    if (localStorage.token_el_cocinillas) {
      const token = { token: localStorage.token_el_cocinillas }
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
          if (data) this.setState({ logged: true, userData: data.authorData })
          console.log("login by token ", data, this.state)
        })
        .catch((data) => console.error(data))
    } else {
      this.setState({ logged: false })
    }
    this.handleLoadRecipes()
  }
  handleChangeUserData = (userData) => {
    this.setState({ userData: userData.data })
    console.log("New state", userData.data)
  }
  handleLoadRecipes = () => {
    const cloud = true
    const heroku = cloud
      ? "https://el-cocinillas-api.herokuapp.com"
      : "http://localhost:3001"
    const skip = {
      skip: this.state.renderedRecipes.length > 1 ? this.state.renderedRecipes.length : 0
    }
    const opts = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(skip)
    }
    const URL = `${heroku}/api/recipes`
    fetch(URL, opts)
      .then((data) => data.json())
      .then((data) => {
        const recipes = this.state.renderedRecipes
        data.data.forEach((recipe) => recipes.push(recipe))
        this.setState({ page: "recipes", renderedRecipes: recipes })
      })
  }
  handleLogOut = () => {
    if (localStorage.token_el_cocinillas) localStorage.removeItem("token_el_cocinillas")
    this.setState({ logged: false })
  }
  handleLoggedState = (data) => {
    if (data.token) {
      console.log("register/Login succesfull", data)
      localStorage.token_el_cocinillas = data.token
      this.setState({ logged: true, userData: data.authorData })
      if (document.getElementsByClassName("modal-backdrop").length !== 0) {
        const modal = [...document.getElementsByClassName("modal-backdrop")]
        modal.forEach((element) => {
          element.style.visibility = "hidden"
        })
      }
    }
  }
  handleChangePageState = (event) => {
    const { id } = event.target
    switch (id) {
      case "create-recipe":
        this.setState({ page: "newRecipe" })
        break
      case "logo":
        this.setState({ page: "recipes" })
        break
      case "authorRecipes":
        this.setState({ page: "authorRecipes" })
        console.log(this.state)
        break
    }
  }
  renderContainer = () => {
    switch (this.state.page) {
      case "loadingRecipes":
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
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
          </div>
        )

      case "newRecipe":
        return (
          <div className="container">
            <NewRecipe
              userData={this.state.userData}
              handleChangeUserData={this.handleChangeUserData}
            />
          </div>
        )

      case "authorRecipes":
        return (
          <div className="container">
            {this.state.userData.recipes.map((recipe, i) => (
              <RecipeCard key={`recipe-${i}`} recipe={recipe} />
            ))}
          </div>
        )

      case "recipes":
        return (
          <div className="container">
            {this.state.renderedRecipes.map((recipe, i) => (
              <RecipeCard key={`recipe-${i}`} recipe={recipe} />
            ))}
          </div>
        )
    }
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
        <MainModal handleLoggedState={this.handleLoggedState} />
      </div>
    )
  }
}
