'use strict'

const Contact = require('../../../models/contact')
const status = require('http-status')
const _ = require('lodash')

async function getContact (req, res, next) {
  try {
    const { id } = req.params
    const contact = await Contact.findById(id).lean()
    if (_.isEmpty(contact)) {
      res.status(status.NOT_FOUND).send()
      return
    }
    res.status(status.OK).json(contact)
  } catch (err) {
    console.error('Call for retrieving conact failed')
    console.error(err.message)
    res.status(status.NOT_FOUND).send({
      message: err.message
    })
  }
}

module.exports = getContact
