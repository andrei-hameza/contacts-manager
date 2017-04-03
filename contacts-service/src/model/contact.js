'use strict'

const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')
const config = require('../config/config.js')
const OFFSET = config.get('default:api:offset')
const LIMIT = config.get('default:api:limit')
const Schema = mongoose.Schema
const emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/

function validateEmail (email) {
  return emailRegex.test(email)
}

const Contact = Schema(
  {
    name: {
      type: String,
      required: true,
      max: 100
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: 'Email address is required',
      validate: {
        validator: validateEmail,
        message: 'Please fill a valid email address'
      }
    },
    phone: {
      type: String,
      max: 15
    }
  }
)

mongoosePaginate.paginate.options = {
  offset: OFFSET,
  limit: LIMIT
}

Contact.plugin(mongoosePaginate)

Contact.pre('findOneAndUpdate', function (next) {
  this.options.runValidators = true
  this.options.new = true
  next()
})

module.exports = mongoose.model('Contact', Contact)
