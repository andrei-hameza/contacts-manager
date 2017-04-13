/* eslint-env mocha */
'use strict'

const request = require('supertest')
const server = require('../../../server/server')
const Contact = require('../../../models/contact')
const url = '/contacts/:id'

describe(`PATCH ${url}`, () => {
  let app, findByIdAndUpdateStub

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

  const testNewData = {
    email: 'foo@bar.com'
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

  it('should update contact by existing id', async function () {
    const testContact = testData[0]
    const id = testContact._id
    const newContact = Object.assign({}, testContact, testNewData)

    findByIdAndUpdateStub = this.sandbox.stub(Contact, 'findByIdAndUpdate').resolves(newContact)

    const response = await request(app).patch(`/contacts/${id}`).send(testNewData)

    findByIdAndUpdateStub.should.be.calledWith(id, testNewData)
    response.body.should.be.containEql(newContact)
    response.status.should.be.equal(200)
  })

  it('should return status 400 for contact update with wrong data', async function () {
    const id = '123'

    findByIdAndUpdateStub = this.sandbox.stub(Contact, 'findByIdAndUpdate').rejects({
      message: 'Bad request'
    })

    const response = await request(app).patch(`/contacts/${id}`).send(testNewData)

    findByIdAndUpdateStub.should.be.calledWith(id, testNewData)
    response.body.should.have.property('message').and.match(/Bad request/)
    response.status.should.be.equal(400)
  })
})
