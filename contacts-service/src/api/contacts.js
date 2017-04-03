'use strict'

const contactsRouter = require('express').Router()
const contactController = require('../controllers/contact')

contactsRouter.get('', contactController.getContactsList)

contactsRouter.get('/:id', contactController.getContact)

contactsRouter.post('/', contactController.createContact)

contactsRouter.delete('/:id', contactController.deleteContact)

contactsRouter.patch('/:id', contactController.updateContact)

module.exports = contactsRouter
