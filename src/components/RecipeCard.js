import React from "react"
import emptyImage from "../empty-image.jpg"
class RecipeCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  // call's the renderRecipe to render other recipe
  handleClick = () => {
    if (this.props.recipe) {
      this.props.renderRecipe(this.props.recipe)
    }
  }
  // thakes the props frontImage to dowload that image,
  //  the is rendered an saved on sesionStorage to future uses
  componentDidMount = () => {
    const imgElement = document.getElementById(`recipe-img-${this.giveIdNumber()}`)
    const imageName = this.props.recipe.frontImage
    if (imageName) {
      if (!sessionStorage[imageName]) {
        const LOCAL = "http://localhost:3001"
        const HEROKU = "https://elcocinillas-api.herokuapp.com"
        fetch(`${LOCAL}/api/recipe/image/${imageName}`)
          .then((image) => image.json())
          .then((image) => {
            if (image.success) {
              sessionStorage[image.data.name] = image.data.data
              imgElement.src = image.data.data
            }
          })
      } else {
        imgElement.src = sessionStorage.getItem(imageName)
      }
    }
  }
  // generates a number to have diferent id's for each img
  giveIdNumber = () => {
    if (this.props.recipe && this.props.page) {
      return this.props.position + 12 * (this.props.page - 1)
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
            src={emptyImage}
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
