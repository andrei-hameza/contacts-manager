'use strict'

const router = require('express').Router()
const api = require('./api')

// endpoints
router.get('', api.contacts.getCollection)
router.get('/:id', api.contacts.get)
router.post('/', api.contacts.create)
router.delete('/:id', api.contacts.remove)
router.patch('/:id', api.contacts.update)

module.exports = router
