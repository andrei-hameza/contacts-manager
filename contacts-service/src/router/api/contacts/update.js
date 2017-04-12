'use strict'

const Contact = require('../../../models/contact')
const status = require('http-status')

async function updateContact (req, res) {
  try {
    const { id } = req.params
    const data = req.body
    const updatedContact = await Contact.findByIdAndUpdate(id, data, { new: true })
    res.status(status.OK).json(updatedContact)
  } catch (err) {
    console.error('Call for updating conact failed')
    console.error(err.message)
    res.status(status.BAD_REQUEST).send({
      message: err.message
    })
  }
}

module.exports = updateContact
