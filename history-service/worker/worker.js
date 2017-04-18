'use strict'

const tortoise = require('../models/tortoise')
const mongoose = require('mongoose')
const processMessage = require('./middleware')
const config = require('../config/')
const uri = config.get('MONGODB_URI') || config.get('mongoose:uri')
const prefetch = config.get('rabbitmq:prefetch')
const queue = tortoise.QUEUE.name

mongoose.Promise = global.Promise

console.log('Worker starting...')

async function main () {
  try {
    await mongoose.connect(uri)
    mongoose.connection.on('error', (error) => {
      console.log('Database connection failed')
      console.error(error)
    })
    tortoise
      .queue(queue)
      .prefetch(prefetch)
      .json()
      .subscribe(async (message, ack, nack) => {
        console.log(message)
        try {
          await processMessage(message)
          console.log('Message was processed successfully')
          ack()
        } catch (err) {
          console.log('Message wasn\'t processed')
          console.error(err)
          nack()
        }
      })
    console.log('Worker started')
  } catch (err) {
    console.log('Worker didn\'t start because of the issue')
    console.error(err)
  }
}

main()
