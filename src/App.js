/* eslint-disable default-case */
// import SeachBar from "./components/nav/SearchBar"
import Logo from "./components/nav/Logo"
import RecipeCard from "./components/RecipeCard"
import VoidCard from "./components/VoidCard"
import MainModal from "./components/modal/MainModal"
import Dropdown from "./components/nav/Dropdown"
import Footer from "./components/Footer"
import NewRecipe from "./components/main/new recipe/NewRecipe"
import Recipe from "./components/main/Recipe"
import Pagination from "./components/Pagination"
import Loading from "./components/Loading"

import React, { Component } from "react"

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      logged: false,
      page: "loadingRecipes",
      userData: "",
      actualRecipe: "",
      renderedRecipes: [],
      totalRecipes: "",
      pagePosition: 1
    }
  }
  componentDidMount = () => {
    const cloud = true
    if (localStorage.token_el_cocinillas) {
      const token = { token: localStorage.token_el_cocinillas }
      const heroku = cloud
        ? "https://elcocinillas-api.herokuapp.com"
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
          if (data) {
            this.setState({ logged: true, userData: data.authorData })
            this.loadRecipes()
          }
          console.log("data of login by token ", data, "the state is", this.state)
        })
        .catch((data) => console.error(data))
    } else {
      this.loadRecipes()
    }
  }
  changeUserData = (userData) => {
    this.setState({ userData: userData.data })
  }
  loadRecipes = (pagePosition = 0) => {
    this.setState({ page: "", renderedRecipes: "" })

    const cloud = true
    const heroku = cloud
      ? "https://elcocinillas-api.herokuapp.com"
      : "http://localhost:3001"
    const skip = {
      skip: pagePosition * 12
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
        this.setState({
          page: "recipes",
          renderedRecipes: data.data,
          totalRecipes: data.pagesLength
        })
      })
  }
  logOut = () => {
    if (localStorage.token_el_cocinillas) localStorage.removeItem("token_el_cocinillas")
    if (this.state.page === "newRecipe" || this.state.page === "authorRecipes")
      this.setState({ logged: false, page: "recipes", userData: "" })
    else this.setState({ logged: false, userData: "" })
  }
  userLogged = (data) => {
    if (data.token) {
      localStorage.token_el_cocinillas = data.token
      this.setState({ logged: true, userData: data.authorData })
      if (document.getElementsByClassName("modal-backdrop").length !== 0) {
        const modal = [...document.getElementsByClassName("modal-backdrop")]
        modal.forEach((element) => {
          element.style.visibility = "hidden"
        })
      }
      if (document.body.className.includes("modal-open"))
        document.body.className = "no-modal"
    }
  }
  changePage = (pageName) => {
    this.setState({ page: pageName })
  }
  renderRecipe = (data) => {
    this.setState({ page: "recipe", actualRecipe: data })
    document.location.href = "#nav"
  }
  changePaginationPosition = (pagePosition) => {
    this.setState({ pagePosition: pagePosition })
    this.loadRecipes(pagePosition - 1)
  }
  renderContainer = () => {
    switch (this.state.page) {
      case "loadingRecipes":
        return (
          <div className="container">
            <VoidCard />
            <VoidCard />
            <VoidCard />
            <VoidCard />
            <VoidCard />
            <VoidCard />
            <VoidCard />
            <VoidCard />
            <VoidCard />
            <VoidCard />
            <VoidCard />
            <VoidCard />
          </div>
        )
      case "newRecipe":
        return (
          <div className="container">
            <NewRecipe
              userData={this.state.userData}
              changeUserData={this.changeUserData}
            />
          </div>
        )
      case "authorRecipes":
        return (
          <div className="container">
            {this.state.userData.recipes.map((recipe, i) => (
              <RecipeCard
                key={`recipe-${i}`}
                position={i + 1}
                recipe={recipe}
                getRecipeImage={this.getRecipeImage}
                renderRecipe={this.renderRecipe}
                page={this.state.pagePosition}
              />
            ))}
          </div>
        )
      case "recipes":
        return (
          <div className="container">
            {this.state.renderedRecipes.map((recipe, i) => (
              <RecipeCard
                key={`recipe-${i}`}
                position={i + 1}
                recipe={recipe}
                getRecipeImage={this.getRecipeImage}
                renderRecipe={this.renderRecipe}
                page={this.state.pagePosition}
              />
            ))}
            <Pagination
              totalRecipes={this.state.totalRecipes}
              changePaginationPosition={this.changePaginationPosition}
              pagePosition={this.state.pagePosition}
            />
          </div>
        )
      case "recipe":
        return (
          <div className="container recipe-pag">
            <Recipe
              getRecipeImage={this.getRecipeImage}
              data={this.state.actualRecipe}
              renderRecipe={this.renderRecipe}
              page={this.state.pagePosition}
            />
          </div>
        )
    }
  }
  render() {
    return (
      <>
        <nav id="nav" className="navbar navbar-expand-lg navbar-light ">
          <Logo
            changePage={this.changePage}
            changePaginationPosition={this.changePaginationPosition}
          />

          {/* <SeachBar /> */}
          <Dropdown
            userData={this.state.userData}
            logged={this.state.logged}
            logOut={this.logOut}
            changePage={this.changePage}
          />
        </nav>
        {this.renderContainer()}

        <Footer />
        {this.state.logged ? undefined : <MainModal userLogged={this.userLogged} />}
        {this.state.totalRecipes > 0 ? undefined : <Loading />}
      </>
    )
  }
}
