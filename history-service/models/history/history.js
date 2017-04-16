'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * History Schema
 */

const HistorySchema = new Schema({
  contactId: {
    type: String,
    default: '',
    trim: true,
    required: true,
    max: 40
  },
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: String,
    default: '0',
    trim: true,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: {
      values: ['ingoing', 'outgoing'],
      message: 'Enum validator failed for path `{PATH}` with value `{VALUE}`'
    }
  }
})

module.exports = mongoose.model('History', HistorySchema)
