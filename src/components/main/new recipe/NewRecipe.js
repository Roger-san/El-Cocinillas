/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable default-case */
/* eslint-disable no-fallthrough */
import React, { Component } from "react"
import Steps from "./Steps"
import Ingredients from "./Ingredients"

export default class NewRecipe extends Component {
  constructor(props) {
    super()
    this.state = {
      author: props.userData.author,
      recipeName: "",
      description: String,
      ingredients: [
        ["", ""],
        ["", ""]
      ],
      steps: ["", ""],
      frontImage: "",
      imagePreview: ""
    }
  }
  handleValuesChange = (data, type) => {
    switch (type) {
      case "recipe-name":
        this.setState({ recipeName: data })
        break
      case "description":
        this.setState({ description: data })
        break
      case "ingredients":
        this.setState({ ingredients: data })
        break
      case "steps":
        this.setState({ steps: data })
        break
      case "fileImage":
        console.log("imageFIle data", data)
        this.setState({ frontImage: data })
        break
    }
  }

  handleListsQuantityChange = (event, position) => {
    switch (event.target.className) {
      case "add-ingredient":
        return this.setState({
          ingredientsQuantity: this.state.ingredients.push(["", ""])
        })

      case "add-step":
        return this.setState({ stepsQuantity: this.state.steps.push("") })

      case "delete-ingredient":
        if (this.state.ingredients.length !== 1) {
          const data = [...this.state.ingredients]
          data.splice(position, 1)
          this.setState({ ingredients: data })
        }

      case "delete-step":
        if (this.state.steps.length !== 1) {
          let data = [...this.state.steps]
          data.splice(position, 1)
          this.setState({ steps: data })
        }
    }
  }
  handleFetch = () => {
    const { author, recipeName, description, ingredients, steps, frontImage } = this.state
    const newRecipe = {
      author: author,
      recipeName: recipeName,
      description: description,
      ingredients: ingredients,
      steps: steps,
      frontImage: frontImage
    }
    const userData = this.props.userData
    userData.recipes.push(newRecipe)
    // console.log(newRecipe)
    const cloud = false
    const heroku = cloud
      ? "https://elcocinillas-api.herokuapp.com"
      : "http://localhost:3001"
    const URL = `${heroku}/api/users/new-recipe`
    const opts = {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ newRecipe: newRecipe, userData: userData })
    }
    fetch(URL, opts)
      .then((data) => data.json())
      .then((data) => {
        // console.log("recipe registred", data)
        if (data.success) {
          this.props.changeUserData(data)
          this.props.renderRecipe(data.data.recipes[data.data.recipes.length - 1])
        }
      })
    // .catch((err) => console.log(err))
  }
  // importFileandPreview = () => {
  //   window.URL = window.URL || window.webkitURL
  //   var preview = document.getElementById("Image preview...")
  //   var file = document.querySelector("input[type=file]").files[0]

  //   preview.src = window.URL.createObjectURL(file)
  //   preview.onload = () => {
  //     window.URL.revokeObjectURL(this.src)
  //   }
  //   console.log(preview)
  // }
  handleChange = (event) => {
    // const file = event.target.files[0]
    // const readFile = (file) => {
    //   return new Promise((resolve, reject) => {
    //     let myReader = new FileReader()
    //     myReader.onloadend = (e) => {
    //       resolve(myReader.result)
    //     }
    //     myReader.readAsDataURL(file)
    //   })
    // }
    // readFile(file).then((base64string) => {
    //   var ext = base64string.split(";")[0].match(/jpeg|png|gif/)[0]
    //   console.log(ext)
    //   // strip off the data: url prefix to get just the base64-encoded bytes
    //   var data = base64string.replace(/^data:image\/\w+;base64,/, "")
    //   var buf = new Buffer.from(data, "base64")
    //   fs.writeFile(
    //     "C:\\Users\\Roger\\Downloads\\image." + ext,
    //     buf,
    //     fs.readFile("image." + ext, "utf-8", function (err, data) {
    //       if (data) console.log("done")
    //     })
    //   )
    // console.log(base64string)
    // })
    this.handleValuesChange(event.target.value, event.target.id)
  }
  render() {
    return (
      <div>
        {/* <img
          src={`${this.state.imagePreview}`}
          height="200"
          id="Image preview..."
          alt="Image preview..."
        ></img> */}

        <input
          type="text"
          name="recipeName"
          id="recipe-name"
          onChange={this.handleChange}
          placeholder="Recipe name"
        />
        {/* poner un max de letras que se vea */}
        <textarea
          placeholder="Description"
          id="description"
          name="description"
          rows="4"
          cols="50"
          onChange={this.handleChange}
        ></textarea>
        <div id="ingredients-container">
          {this.state.ingredients.map((values, i) => (
            <Ingredients
              values={values}
              position={i}
              key={`ingredient-${i}`}
              handleListsQuantityChange={this.handleListsQuantityChange}
              handleValuesChange={this.handleValuesChange}
            />
          ))}
        </div>
        <div id="steps-container">
          {this.state.steps.map((value, i) => (
            <Steps
              value={value}
              position={i}
              key={`step-${i}`}
              handleListsQuantityChange={this.handleListsQuantityChange}
              handleValuesChange={this.handleValuesChange}
            />
          ))}
        </div>
        <div id="file-image-container">
          <label id="file-button">
            Add image
            <input
              type="file"
              accept="image/*"
              id="fileImage"
              capture="camera"
              onChange={this.handleChange}
            />
          </label>
        </div>
        <button onClick={this.handleFetch}>send</button>
      </div>
    )
  }
}

// const file = event.target.files[0]
// const readFile = (file) => {
//   return new Promise((resolve, reject) => {
//     let myReader = new FileReader()
//     myReader.onloadend = (e) => {
//       resolve(myReader.result)
//     }
//     myReader.readAsDataURL(file)
//   })
// }
// readFile(file).then((base64string) => {
//   var ext = base64string.split(";")[0].match(/jpeg|png|gif/)[0]
//   // strip off the data: url prefix to get just the base64-encoded bytes
//   var data = base64string.replace(/^data:image\/\w+;base64,/, "")
//   var buf = new Buffer.from(data, "base64")
//   writeFile("image." + ext, buf, (err) => {
//     if (err) console.log(err)
//     else console.log("object")
//   })
//   console.log(base64string)
// })
