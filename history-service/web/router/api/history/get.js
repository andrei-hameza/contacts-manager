'use strict'

const History = require('../../../../models/history')
const status = require('http-status')
const _ = require('lodash')

async function getHistoryRecord (req, res, next) {
  try {
    const { id } = req.params
    const record = await History.findById(id).lean()
    if (_.isEmpty(record)) {
      res.status(status.NOT_FOUND).send()
      return
    }
    res.status(status.OK).json(record)
  } catch (err) {
    console.error('Call for retrieving conact failed')
    console.error(err.message)
    res.status(status.NOT_FOUND).send({
      message: err.message
    })
  }
}

module.exports = getHistoryRecord
