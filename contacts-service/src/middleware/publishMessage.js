'use strict'

const tortoise = require('../models/tortoise')

async function publishMessage (req, res, next) {
  let message

  console.info('Manipulation with contacts is detected')

  try {
    const queue = tortoise.QUEUE.name

    message = {
      type: req.method,
      payload: {
        contactId: req.params.id
      }
    }

    await tortoise.queue(queue).publish(message)
    console.info('Message was published to queue successfully: ', message)
    next()
  } catch (err) {
    console.error('Message wasn\'t published to queue due to error: ', message, err)
  }
}

module.exports = publishMessage
