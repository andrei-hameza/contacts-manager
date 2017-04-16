/* eslint-env mocha */
'use strict'

const publishMessage = require('./publishMessage')
// eslint-disable-next-line
const should = require('should')
require('should-sinon')
const tortoise = require('../models/tortoise')

describe('publishMessage middleware', () => {
  it('should be a function', () => {
    publishMessage.should.be.Function()
  })

  it('should accept three arguments', () => {
    const length = publishMessage.length
    length.should.be.equal(3)
  })

  describe('during queue interaction', () => {
    let queueName, nextSpy, req, message, publishStub, queueStub

    beforeEach(function () {
      queueName = 'test-queue'
      nextSpy = this.sandbox.spy()

      req = {
        params: {
          id: '1234'
        },
        method: 'DELETE'
      }

      message = {
        type: req.method,
        payload: {
          contactId: req.params.id
        }
      }

      this.sandbox.stub(tortoise, 'QUEUE', { name: queueName })
    })

    it('should be able to publish the message to queue', async function () {
      publishStub = {
        publish: this.sandbox.stub().resolves()
      }
      queueStub = this.sandbox.stub(tortoise, 'queue').returns(publishStub)

      await publishMessage(req, {}, nextSpy)

      queueStub.should.be.calledWith(queueName)
      publishStub.publish.should.be.calledWith(message)
      nextSpy.should.be.called()
    })

    it('should be able to handle a publishing issue', async function () {
      publishStub = {
        publish: this.sandbox.stub().rejects()
      }
      queueStub = this.sandbox.stub(tortoise, 'queue').returns(publishStub)

      await publishMessage(req, {}, nextSpy)

      queueStub.should.be.calledWith(queueName)
      publishStub.publish.should.be.calledWith(message)
      nextSpy.should.not.be.called()
    })
  })
})
