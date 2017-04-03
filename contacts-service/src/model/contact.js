const mongoose = require('mongoose')
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

module.exports = mongoose.model('Contact', Contact)
