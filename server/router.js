const express = require('express')
const router = express.Router()
const mongoHandler = require('./mongoHandler')
router.post('/links', (req, res) => {
  const validURL = (str) => {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }
  if (req.body.originalUrl) {
    if (validURL(req.body.originalUrl)) {
      mongoHandler.createShortLink(req.body.originalUrl, res).then()
    } else {
      res.status(400).send('Отправленные вами данные - не ссылка! В поле ввода должна быть ссылка')
    }
  } else {
    res.status(400).send('Вы оставили поле для ввода url пустым')
  }
})

router.get('/:shortUrl', (req, res) => {
  mongoHandler.readShortLink(req.params.shortUrl, res).then()
})

module.exports = router