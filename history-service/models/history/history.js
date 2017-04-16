'use strict'

const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const config = require('../../config/')
const OFFSET = config.get('default:api:offset')
const LIMIT = config.get('default:api:limit')
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

/**
* Plugins
*/

mongoosePaginate.paginate.options = {
  offset: OFFSET,
  limit: LIMIT
}

HistorySchema.plugin(mongoosePaginate)

module.exports = mongoose.model('History', HistorySchema)
