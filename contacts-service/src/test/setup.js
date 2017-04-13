'use strict'

const sinon = require('sinon')
const chai = require('chai')
const sinonChai = require('sinon-chai')

process.env.PORT = 3000

before(() => {
  chai.use(sinonChai)
})

beforeEach(function beforeEach () {
  this.sandbox = sinon.sandbox.create()
  this.sandbox.stub(console, 'info')
  this.sandbox.stub(console, 'error')
})

afterEach(function afterEach () {
  this.sandbox.restore()
})
