'use strict'

const server = require('./server/server.js')
const config = require('./config/config')
const port = config.get('port')

console.log('### Contacts service ###')

console.log('Starting http server...')

server
  .start({ port })
  .then(() => {
    console.log('Server started on port: ', port)
  }).catch((e) => {
    console.error('Server couldn\'t start. Please, define a port.')
  })
