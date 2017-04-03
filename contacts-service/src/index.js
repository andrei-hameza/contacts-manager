/* eslint-env node */
const server = require('./server/server.js')
const options = { port: null }

console.log('### Contacts service ###')

console.log('Starting http server...')

async function start () {
  try {
    await server.start(options)
    console.log('Server started on port: ', options.port)
  } catch (e) {
    console.error('Server couldn\'t start. Please, define a port.')
  }
}

start()
