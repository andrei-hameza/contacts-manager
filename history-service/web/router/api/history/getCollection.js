'use strict'

const History = require('../../../../models/history')
const status = require('http-status')
const _ = require('lodash')
const R = require('ramda')

// TODO: add validation for query params

async function getHistoryRecords (req, res) {
  try {
    const toDigitNumber = R.partialRight(parseInt, [10])
    const isNonNegativeInteger = R.both(_.isInteger, R.lte(0))
    const supportedQueryParams = R.compose(R.filter(isNonNegativeInteger), R.map(toDigitNumber), R.pick(['offset', 'limit']))
    const options = supportedQueryParams(req.query)
    const query = R.pick(['contactId'], req.query)

    const contacts = await History.paginate(query, options)
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

module.exports = getHistoryRecords
