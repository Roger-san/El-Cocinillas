/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import SeachBar from "./components/SearchBar"
import Logo from "./components/Logo"
import Modal from "./components/Modal"
import RecipeCard from "./components/RecipeCard"
import Dropdown from "./components/Dropdown"
import Footer from "./components/Footer"
import NewRecipe from "./components/main/NewRecipe"

function App() {
  return (
    <div>
      <NewRecipe />
      {/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Logo />
        <SeachBar />
        <Dropdown />
      </nav>
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
      <Footer />
      <Modal /> */}
    </div>
  )
}

export default App
