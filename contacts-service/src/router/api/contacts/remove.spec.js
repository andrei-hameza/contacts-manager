/* eslint-env mocha */
'use strict'

const request = require('supertest')
const server = require('../../../server/server')
const Contact = require('../../../models/contact')
const url = '/contacts/:id'

describe(`DELETE ${url}`, () => {
  let app, findByIdAndRemoveStub

  const testData = [{
    _id: '58e2a26234fa7217c5155a40',
    name: 'John Smith',
    email: 'john.smith@smith.com',
    phone: '13432453453'
  }, {
    _id: '58e2a1f11e071f1730466238',
    name: 'John Smith',
    email: 'john.smith@smith.com',
    phone: '13432453453'
  }]

  beforeEach(function () {
    return server.start({ port: 3000 }).then(serv => {
      app = serv
    })
  })

  afterEach(() => {
    app.close()
    app = null
  })

  it('should remove contact by existing id', async function () {
    const testContact = testData[0]
    const id = testContact._id

    findByIdAndRemoveStub = this.sandbox.stub(Contact, 'findByIdAndRemove').resolves(testData.find((contact) => contact._id === id))

    const response = await request(app).delete(`/contacts/${id}`)

    findByIdAndRemoveStub.should.be.calledWith(id)
    response.body.should.be.empty()
    response.status.should.be.equal(204)
  })

  it('should return status 404 for empty contact', async function () {
    const id = '123'

    findByIdAndRemoveStub = this.sandbox.stub(Contact, 'findByIdAndRemove').resolves()

    const response = await request(app).delete(`/contacts/${id}`)

    findByIdAndRemoveStub.should.be.calledWith(id)
    response.body.should.be.empty()
    response.status.should.be.equal(404)
  })

  it('should return status 404 for non-existing id', async function () {
    const id = '123'

    findByIdAndRemoveStub = this.sandbox.stub(Contact, 'findByIdAndRemove').rejects({
      message: 'Not found'
    })

    const response = await request(app).delete(`/contacts/${id}`)

    findByIdAndRemoveStub.should.be.calledWith(id)
    response.body.should.have.property('message').and.match(/Not found/)
    response.status.should.be.equal(404)
  })
})
