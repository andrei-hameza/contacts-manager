'use strict'

const status = require('http-status')
const contactsRouter = require('express').Router()
const config = require('../config/config.js')
const _ = require('lodash')
const OFFSET = config.get('default:api:offset')
const LIMIT = config.get('default:api:limit')

const contacts = []
var id = 0

contactsRouter.get('', (req, res) => {
  const { offset = OFFSET, limit = LIMIT } = req.query
  const data = contacts.slice(parseInt(offset), parseInt(offset) + parseInt(limit))
  res.status(status.OK).json(data)
})

contactsRouter.get('/:id', (req, res) => {
  const { id } = req.params
  const contact = _.find(contacts, { id: id })
  if (!contact) {
    res.status(status.NOT_FOUND).send()
    return
  }
  res.status(status.OK).json(contact)
})

contactsRouter.post('/', (req, res) => {
  const contact = req.body
  const contactId = id++
  const newContact = Object.assign({ id: contactId.toString() }, contact)
  contacts.push(newContact)
  res.status(status.OK).json(newContact)
})

contactsRouter.patch('/:id', (req, res) => {
  const { id } = req.params
  const contact = _.find(contacts, { id: id })
  if (!contact) {
    res.status(status.NOT_FOUND).send()
    return
  }
  Object.assign(contact, req.body)
  res.status(status.OK).json(contact)
})

contactsRouter.delete('/:id', (req, res) => {
  const { id } = req.params
  const contactIndex = _.findIndex(contacts, { id: id })

  if (contactIndex < 0) {
    res.status(status.NOT_FOUND).send()
    return
  }
  const [deletedContact] = contacts.splice(contactIndex, 1)
  res.status(status.OK).json(deletedContact)
})

module.exports = contactsRouter
