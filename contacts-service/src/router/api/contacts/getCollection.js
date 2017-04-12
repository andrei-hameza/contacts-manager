'use strict'

const Contact = require('../../../models/contact')
const status = require('http-status')
const _ = require('lodash')

async function getContactsList (req, res) {
  try {
    const offset = parseInt(req.query.offset, 10)
    const limit = parseInt(req.query.limit, 10)
    const options = {}
    if (_.isInteger(offset)) {
      Object.assign(options, { offset })
    }
    if (_.isInteger(limit)) {
      Object.assign(options, { limit })
    }
    const contacts = await Contact.paginate({}, options)
    res.status(status.OK).json({
      collection: contacts.docs,
      total: contacts.total
    })
  } catch (err) {
    console.error('Call for retrieving list of conacts failed')
    console.error(err.message)
    res.status(status.NOT_FOUND).send({
      message: err.message
    })
  }
}

module.exports = getContactsList
