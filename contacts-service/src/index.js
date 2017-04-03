'use strict'

const server = require('./server/server.js')
const config = require('./config/config')
const port = config.get('port')

console.log('### Contacts service ###')

console.log('Starting http server...')

async function start () {
  try {
    await server.start({ port })
    console.log('Server started on port: ', port)
  } catch (e) {
    console.error('Server couldn\'t start. Please, define a port.')
  }
}

start()
