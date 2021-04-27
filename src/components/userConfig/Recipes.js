import React, { Component } from "react"
import RecipeCard from "../RecipeCard"
export default class Recipes extends Component {
  render() {
    return (
      <div>
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
      </div>
    )
  }
}
