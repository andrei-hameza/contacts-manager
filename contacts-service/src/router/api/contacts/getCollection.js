'use strict'

const Contact = require('../../../models/contact')
const status = require('http-status')
const _ = require('lodash')
const R = require('ramda')

async function getContactsList (req, res) {
  try {
    const toDigitNumber = R.partialRight(parseInt, [10])
    const isNonNegativeInteger = R.both(_.isInteger, R.lte(0))
    const supportedQueryParams = R.compose(R.filter(isNonNegativeInteger), R.map(toDigitNumber), R.pick(['offset', 'limit']))
    const options = supportedQueryParams(req.query)
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
