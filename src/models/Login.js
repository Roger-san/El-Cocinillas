const mongoose = require("mongoose")

const Schema = mongoose.Schema

const loginSchema = new Schema(
  {
    name: String,
    email: String,
    password: String
  },
  { versionKey: false }
)

module.exports = mongoose.model("Login", loginSchema)
