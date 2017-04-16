'use strict'

const History = require('../../models/history')

// TODO: create message Schema
// TODO: add data validation
// TODO: separate validation and db communication issues

function processMessage (message) {
  let record
  const { type, payload } = message
  switch (type) {
    case 'POST':
      record = new History({
        contactId: payload.contactId,
        date: payload.date,
        duration: payload.duration,
        type: payload.type
      })
      return record.save()
    case 'DELETE':
      console.log('Process delete message here')
      return History.remove({ contactId: payload.contactId })
  }
  return Promise.reject(new Error('Message is not recognized'))
}

module.exports = processMessage
