const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const log = require("../log/log")

const URLDB = "mongodb://localhost/Proyecto"

const wsInit = () => {
  const app = express()
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
    app.options("*", (req, res) => {
      // allowed XHR methods
      res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE, OPTIONS")
      res.send()
    })
  })
  const opts = {useNewUrlParser: true, useUnifiedTopology: true}
  mongoose.connect(URLDB, opts, (err, res) => {
    if (err) console.error(err, opts, "fallo en la base de datos")
    else console.log("base de datos conectada")
  })
  //midleware
  app.all("*", function (req, res, next) {
    log.log(req, "api")
    next()
  })
  return app
}
module.exports = {wsInit: wsInit}
