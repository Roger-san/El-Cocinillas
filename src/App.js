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
import Searcher from "./components/nav/Searcher"
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
      pagePosition: 1,
      recipesList: ""
    }
  }
  // looks for a token to login and calls loadRecipes()
  componentDidMount = () => {
    if (localStorage.token_el_cocinillas) {
      const LOCAL = "http://localhost:3001"
      const HEROKU = "https://elcocinillas-api.herokuapp.com"
      fetch(`${HEROKU}/api/login/token/${localStorage.token_el_cocinillas}`)
        .then((data) => data.json())
        .then((data) => {
          if (data) {
            this.setState({ logged: true, userData: data.authorData })
            this.loadRecipes()
          }
          console.log("data of login by token:", data, "the state is:", this.state)
        })
        .catch((data) => console.error(data))
    } else {
      this.loadRecipes()
    }
  }
  // is called when a new recipe is added to update the user data
  changeUserData = (userData) => {
    this.setState({ userData: userData.data })
  }
  // load multiples of 12 recipes and all the names of the
  // recipes for the datalist of the searcher
  loadRecipes = (pagePosition = 0) => {
    this.setState({ page: "", renderedRecipes: "" })
    const LOCAL = "http://localhost:3001"
    const HEROKU = "https://elcocinillas-api.herokuapp.com"
    fetch(`${HEROKU}/api/recipes/${pagePosition * 12}`)
      .then((data) => data.json())
      .then((data) => {
        this.setState({
          page: "recipes",
          renderedRecipes: data.recipes,
          totalRecipes: data.totalRecipes,
          recipesList: data.recipesList
        })
      })
  }
  // delete the token and deletes the userData state
  logOut = () => {
    if (localStorage.token_el_cocinillas) localStorage.removeItem("token_el_cocinillas")
    if (this.state.page === "newRecipe" || this.state.page === "authorRecipes")
      this.setState({ logged: false, page: "recipes", userData: "" })
    else this.setState({ logged: false, userData: "" })
  }
  // logs the user when he uses the register or the login forms
  // and saves the token
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
  // changing this state the user renders the main sections
  changePage = (pageName) => {
    this.setState({ page: pageName })
  }
  // render the clicked recipe page
  renderRecipe = (data) => {
    this.setState({ page: "recipe", actualRecipe: data })
    document.location.href = "#nav"
  }
  // changes the .active number of the pagination component and loads the new recipes
  changePaginationPosition = (pagePosition) => {
    this.setState({ pagePosition: pagePosition })
    this.loadRecipes(pagePosition - 1)
  }
  // render the main section of the page
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
        <nav id="nav" className="navbar navbar-expand-lg navbar-light bg-light">
          <Logo
            changePage={this.changePage}
            changePaginationPosition={this.changePaginationPosition}
          />
          <Searcher
            recipesNames={this.state.recipesList}
            renderRecipe={this.renderRecipe}
          />
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
