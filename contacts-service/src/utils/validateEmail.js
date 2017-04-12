'use strict'

const emailRegex = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/

function validateEmail (email) {
  return emailRegex.test(email)
}

module.exports = validateEmail
