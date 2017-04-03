'use strict'

const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const api = require('../api/contacts')

const start = (options) => {
  return new Promise((resolve, reject) => {
    if (!options.port) {
      reject(new Error('Server port should be defined'))
    }

    const app = express()

    app.use(morgan('dev'))
    app.use(helmet())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use('/contacts', api)

    // error handler
    app.use((err, req, res, next) => {
      res.status(err.status || 500)
      console.error(err)
      res.json({
        error: err.message
      })
    })

    app.listen(options.port, () => resolve())
  })
}

module.exports = { start }
