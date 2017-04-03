const mongoose = require('mongoose')
var db

const connect = (options) => {
  return new Promise((resolve, reject) => {
    const { uri } = options
    mongoose.connect(uri)
    db = mongoose.connection

    db.on('error', (error) => {
      console.log('Database connection failed')
      reject(error)
    })

    db.once('open', () => {
      console.log('Database connection is supplied')
      resolve()
    })
  })
}

const disconnect = () => {
  db.close()
}

module.exports = {
  connect,
  disconnect
}
