'use strict'

const router = require('express').Router()
const api = require('./api')

// endpoints
router.get('', api.history.getCollection)
router.get('/:id', api.history.get)
router.delete('/:id', api.history.remove)

module.exports = router
