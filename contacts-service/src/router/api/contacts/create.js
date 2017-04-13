'use strict'

const Contact = require('../../../models/contact')
const status = require('http-status')

async function createContact (req, res) {
  try {
    const newContact = new Contact(req.body)
    await newContact.save()
    res.status(status.CREATED).json(newContact)
  } catch (err) {
    console.error('Call for saving conact failed')
    console.error(err.message)
    res.status(status.BAD_REQUEST).send({
      message: err.message
    })
  }
}

module.exports = createContact
