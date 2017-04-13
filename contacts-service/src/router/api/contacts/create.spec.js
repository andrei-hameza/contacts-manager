/* eslint-env mocha */
'use strict'

const request = require('supertest')
const server = require('../../../server/server')
const Contact = require('../../../models/contact')
const url = '/contacts/:id'

describe(`POST ${url}`, () => {
  let app, saveStub

  const newContactData = {
    name: 'John Smith',
    email: 'john.smith@smith.com',
    phone: '13432453453'
  }

  beforeEach(function () {
    return server.start({ port: 3000 }).then(serv => {
      app = serv
    })
  })

  afterEach(() => {
    app.close()
    app = null
  })

  it('should create contact', async function () {
    saveStub = this.sandbox.stub(Contact.prototype, 'save').resolves()

    const response = await request(app).post(`/contacts`).send(newContactData)

    saveStub.should.be.called()
    response.body.should.have.property('_id')
    response.body.should.have.property('name', newContactData.name)
    response.body.should.have.property('email', newContactData.email)
    response.body.should.have.property('phone', newContactData.phone)
    response.status.should.be.equal(201)
  })

  it('should return status 400 for contact with wrong data', async function () {
    saveStub = this.sandbox.stub(Contact.prototype, 'save').rejects({
      message: 'Bad request'
    })

    const response = await request(app).post(`/contacts`).send(newContactData)

    saveStub.should.be.called()
    response.body.should.have.property('message').and.match(/Bad request/)
    response.status.should.be.equal(400)
  })
})
