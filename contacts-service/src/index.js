const server = require('./server/server.js')

console.log('### Contacts service ###')

console.log('Starting http server...')

server
  .start({ port: 3000 })
  .then((port) => {
    console.log('Server started on port: ', port)
  }).catch(() => {
    console.error('Server couldn\'t start. Please, define a port.')
  })
