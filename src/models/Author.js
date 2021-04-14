const mongoose = require("mongoose")

const Schema = mongoose.Schema

//los schema se usan para introducir la info en la base de datos

const recipeSchema = new Schema(
  {
    id: String,
    name: String,
    descripcion: String,
    frontImage: String,
    descriptionImage: String,
  },
  {versionKey: false, _id: false}
)

const authorSchema = new Schema(
  {
    author: String,
    recipes: [recipeSchema],
  },
  {versionKey: false}
)
module.exports = mongoose.model("Author", authorSchema)
