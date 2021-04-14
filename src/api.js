const {appInit} = require("./config/apiConfig.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const log = require("./log/log.js")
const Author = require("./models/Author.js")
const Recipe = require("./models/Recipe.js")
const Login = require("./models/Login.js")

const api = appInit()

const PORT = 1021
// MIDDLEWARE
api.all("*", function (req, res, next) {
  log.log(req, "api")
  next()
})
// GET
api.get("/api/users/register", (req, res) => {
  Login.findOne({email: req.body.email}, (err, user) => {
    if (err) return res.status(500).send("Fallo de login")
    if (!user) return res.status(403).send("Usuario u o contraseña incorrecta")
    if (user) {
    }
  })
})
api.get("/api/recipe/:id", (req, res) => {
  Recipe.findById()
})
// POST
api.post("/api/new-recipe", (req, res) => {
  const {
    author,
    name,
    descripcion,
    ingredient,
    steps,
    frontImage,
    descriptionImage,
  } = req.body
  if (author && name && steps) {
    const newRecipe = new Recipe({
      author: author,
      name: name,
      descripcion: descripcion || undefined,
      ingredient: ingredient || undefined,
      steps: steps,
      frontImage: frontImage || undefined,
      descriptionImage: descriptionImage || undefined,
    })

    const autorRecipe = {
      id: "asd", // ay que cambiar el como opera la id
      name: name,
      descripcion: descripcion || undefined,
      frontImage: frontImage || undefined,
      descriptionImage: descriptionImage || undefined,
    }

    Author.findOneAndUpdate(
      {author: req.body.author},
      {$push: {recipes: autorRecipe}},
      {new: true, upsert: true, useFindAndModify: false},
      (err, data) => {
        if (err) console.log(err)
        // if (data) console.log(`este es el bd del autor:${data}`)
      }
    )

    newRecipe.save((err, saved) => {
      if (err)
        res.status(400).send({
          success: false,
          data: err,
        })
      else {
        console.log(saved)
        res.status(201).send({
          success: true,
          dataCreated: saved,
        })
      }
    })
  } else res.status(400).send("we need more data")
})
api.post("/api/users/login", (req, res) => {
  Login.findOne({email: req.body.email}, (err, user) => {
    if (err) return res.status(500).send("Fallo de login")
    if (!user) return res.status(403).send("Usuario u o contraseña incorrecta")
    if (user) {
      //compare compara si la contraseña no encriptada machea con la encriptada
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) return res.status(500).send("Fallo de login")
        if (result) {
          const token = jwt.sign({usuario: user}, log.LOG, {expiresIn: "24h"})
          console.log("login correcto")
          return res.cookie("token", token).status(200).send("login correcto")
        } else res.status(403).send("Usuario y o contraseña incorrectos")
      })
    }
  })
})
api.listen(PORT, () => console.log(`Api is running in localhost:${PORT}`))
