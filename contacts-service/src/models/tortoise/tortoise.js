'use strict'

const Tortoise = require('tortoise')
const config = require('../../config')
const rabbitmqUri = config.get('RABBITMQ_URI') || config.get('rabbitmq:uri')
const rabbitmqQueue = config.get('rabbitmq:queue')

const tortoise = new Tortoise(rabbitmqUri)

console.log(rabbitmqUri)

tortoise.on(Tortoise.EVENTS.CONNECTIONCLOSED, () => {
  console.error('RabbitMQ connection closed')
})

tortoise.on(Tortoise.EVENTS.CONNECTIONDISCONNECTED, () => {
  console.error('RabbitMQ connection disconnected')
})

tortoise.on(Tortoise.EVENTS.CONNECTIONERROR, (err) => {
  console.error('RabbitMQ connection error', err)
})

module.exports = Object.assign(tortoise, {
  QUEUE: {
    name: rabbitmqQueue
  }
})
