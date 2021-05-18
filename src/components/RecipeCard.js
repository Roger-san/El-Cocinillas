/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import hamburger from "../hamburger.jpg"
class RecipeCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  handleClick = () => {
    if (this.props.recipe) {
      this.props.renderRecipe(this.props.recipe)
    }
  }
  componentDidMount = () => {
    const img = document.getElementById(`recipe-img-${this.giveIdNumber()}`)
    img.src = hamburger
  }
  giveIdNumber = () => {
    if (this.props.recipe && this.props.page) {
      // console.log(this.props.position + 12 * (this.props.page - 1))
      return this.props.position + 12 * (this.props.page - 1)
    }
  }
  getImageData = () => {
    if (this.props.recipe.frontImage) {
      const cloud = true
      const heroku = cloud
        ? "https://elcocinillas-api.herokuapp.com"
        : "http://localhost:3001"
      const URL = `${heroku}/api/recipe/image/${this.props.recipe.frontImage}`
      fetch(URL)
        .then((data) => data.json())
        .then((data) => {
          console.log(data.data[0])
          if (data.success) {
            const img = document.getElementById(`recipe-img-${this.giveIdNumber()}`)
            if (img && data.data[0]) {
              img.src = data.data[0].data
            }
          }
        })
    }
  }
  render() {
    return (
      <div
        className="card"
        id={`recipe-${this.giveIdNumber()}`}
        onClick={this.handleClick}
      >
        <div className="img-wrapper">
          <img
            id={`recipe-img-${this.giveIdNumber()}`}
            src={this.getImageData()}
            className="card-img-top"
            alt="recipe img"
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">
            {this.props.recipe ? this.props.recipe.recipeName : "Card title"}
          </h5>
          <p className="card-text">
            {this.props.recipe
              ? this.props.recipe.description
              : "Some quick example text to build on the card title and make up the bulk of the card's content."}
          </p>
          {this.props.recipe ? (
            <p className="card-author">By {this.props.recipe.author}</p>
          ) : undefined}
        </div>
      </div>
    )
  }
}
export default RecipeCard
