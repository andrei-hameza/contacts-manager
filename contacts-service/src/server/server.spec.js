/* eslint-env mocha */
const server = require('./server')
// eslint-disable-next-line
const should = require('should')

describe('Server', () => {
  it('should be able to start on port', () => {
    const options = {
      port: 5555
    }

    return server.start(options).should.be.fulfilledWith(options)
  })

  it('should require a port to start', () => {
    const options = {}

    return server.start(options).should.be.rejectedWith(/port/)
  })
})
