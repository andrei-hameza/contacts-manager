'use strict'

const Contact = require('../model/contact')
const status = require('http-status')
const _ = require('lodash')

async function getContactsList (req, res) {
  try {
    const offset = parseInt(req.query.offset, 10)
    const limit = parseInt(req.query.limit, 10)
    const options = {}
    if (_.isInteger(offset)) {
      Object.assign(options, { offset })
    }
    if (_.isInteger(limit)) {
      Object.assign(options, { limit })
    }
    const contacts = await Contact.paginate({}, options)
    res.status(status.OK).json({
      collection: contacts.docs,
      total: contacts.total
    })
  } catch (err) {
    console.error('Call for retrieving list of conacts failed')
    console.error(err.message)
    res.status(status.NOT_FOUND).send({
      message: err.message
    })
  }
}

async function getContact (req, res, next) {
  try {
    const { id } = req.params
    const contact = await Contact.findById(id).lean()
    if (_.isEmpty(contact)) {
      res.status(status.NOT_FOUND).send()
      return
    }
    res.status(status.OK).json(contact)
  } catch (err) {
    console.error('Call for retrieving conact failed')
    console.error(err.message)
    res.status(status.NOT_FOUND).send({
      message: err.message
    })
  }
}

async function createContact (req, res) {
  try {
    const newContact = new Contact(req.body)
    await newContact.save()
    res.status(status.CREATED).json(newContact)
  } catch (err) {
    console.error('Call for saving conact failed')
    console.error(err.message)
    res.status(status.NOT_ACCEPTABLE).send({
      message: err.message
    })
  }
}

async function updateContact (req, res) {
  try {
    const { id } = req.params
    const data = req.body
    const updatedContact = await Contact.findByIdAndUpdate(id, data, { new: true })
    res.status(status.OK).json(updatedContact)
  } catch (err) {
    console.error('Call for updating conact failed')
    console.error(err.message)
    res.status(status.BAD_REQUEST).send({
      message: err.message
    })
  }
}

async function deleteContact (req, res) {
  try {
    const { id } = req.params
    await Contact.findByIdAndRemove(id)
    res.status(status.NO_CONTENT).json()
  } catch (err) {
    console.error('Call for deleting conact failed')
    console.error(err.message)
    res.status(status.NOT_FOUND).send()
  }
}

module.exports = {
  getContactsList,
  getContact,
  createContact,
  updateContact,
  deleteContact
}
