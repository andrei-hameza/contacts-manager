'use strict'

const History = require('../../../../models/history')
const status = require('http-status')

async function removeHistoryRecord (req, res, next) {
  try {
    const { id } = req.params
    const record = await History.findByIdAndRemove(id)
    if (!record) {
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

module.exports = removeHistoryRecord
