'use strict'

const Contact = require('../../../models/contact')
const status = require('http-status')

async function removeContact (req, res) {
  try {
    const { id } = req.params
    await Contact.findByIdAndRemove(id)
    res.status(status.NO_CONTENT).json()
  } catch (err) {
    console.error('Call for deleting conact failed')
    console.error(err.message)
    res.status(status.NOT_FOUND).send()
  }
}

module.exports = removeContact
