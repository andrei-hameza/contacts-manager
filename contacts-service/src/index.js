'use strict'

const server = require('./server/server.js')
const options = { port: 3000 }

console.log('### Contacts service ###')

console.log('Starting http server...')

server
  .start(options)
  .then((port) => {
    console.log('Server started on port: ', options.port)
  }).catch(() => {
    console.error('Server couldn\'t start. Please, define a port.')
  })
