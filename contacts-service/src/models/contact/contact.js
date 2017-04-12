'use strict'

const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const config = require('../../config/config.js')
const OFFSET = config.get('default:api:offset')
const LIMIT = config.get('default:api:limit')
const Schema = mongoose.Schema

/**
 * Contact Schema
 */

const ContactSchema = new Schema({
  name: {
    type: String,
    default: '',
    trim: true,
    required: true,
    max: 100
  },
  email: {
    type: String,
    default: '',
    trim: true,
    lowercase: true,
    max: 50
  },
  phone: {
    type: String,
    default: '',
    trim: true,
    max: 15
  }
})

/**
 * Validations
 */

ContactSchema.path('name').required(true, 'Name field can\'t be empty')

ContactSchema.path('email').validate((email) => {
  const emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/
  return emailRegex.test(email)
}, 'Provide a valid email address')

/**
* Pre-findOneAndUpdate hook
*/

ContactSchema.pre('findOneAndUpdate', function (next) {
  this.options.runValidators = true
  this.options.new = true
  next()
})

/**
* Plugins
*/

mongoosePaginate.paginate.options = {
  offset: OFFSET,
  limit: LIMIT
}

ContactSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Contact', ContactSchema)
