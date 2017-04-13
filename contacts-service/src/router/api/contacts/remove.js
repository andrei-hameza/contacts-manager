'use strict'

const Contact = require('../../../models/contact')
const status = require('http-status')

async function removeContact (req, res, next) {
  try {
    const { id } = req.params
    const contact = await Contact.findByIdAndRemove(id)
    if (!contact) {
      res.status(status.NOT_FOUND).json()
      return
    }
    res.status(status.NO_CONTENT).json()
    next()
  } catch (err) {
    console.error('Call for deleting conact failed')
    console.error(err.message)
    res.status(status.NOT_FOUND).send({
      message: err.message
    })
  }
}

module.exports = removeContact
