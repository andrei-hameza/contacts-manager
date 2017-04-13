'use strict'

const tortoise = require('../models/tortoise')

async function publishMessage (req, res, next) {
  const queue = tortoise.QUEUE.contacts

  const message = {
    method: req.method,
    user: req.params.id
  }

  console.log('Manipulation with contacts is detected')

  try {
    await tortoise.queue(queue).publish(message)
    console.log('Message was published to queue successfully: ', message)
    next()
  } catch (err) {
    console.error('Message wasn\'t published to queue due to error: ', message, err)
    throw err
  }
}

module.exports = publishMessage
