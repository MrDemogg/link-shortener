const express = require('express')
const router = express.Router()
const mongoHandler = require('./mongoHandler')
router.post('/links', (req, res) => {
  mongoHandler.createShortLink(req.body.originalUrl, res).then()
})

router.get('/:shortUrl', (req, res) => {
  mongoHandler.readShortLink(req.params.shortUrl, res).then()
})

module.exports = router