const { MongoClient, ObjectId} = require('mongodb');

const client = new MongoClient('mongodb://localhost:27017')

const mongoHandler = {
  createShortLink: async (url, res) => {
    console.log('create')
    try {
      const shortLinkGenerator = () => {
        const values = 'abcdefghigklmnopqrstuvwxzABCDEFGHIGKLMNOPQRSTUVWXYZ'
        let link = ''
        for (let i = 0; i < 7; i++) {
          link += values[Math.round(Math.random() * (values.length - 1))]
        }
        return link
      }
      await client.connect()
      console.log('started')
      const links = client.db().collection('links')
      let shortLink = shortLinkGenerator()
      console.log('inserting')
      await links.insertOne({_id: new ObjectId(), shortUrl: shortLink, originalUrl: url})
      res.status(202).send('http://localhost:8000/' + shortLink)
    } catch (e) {
      console.log(e)
    }
  },
  readShortLink: async (shortUrl, res) => {
    try {
      await client.connect()
      const links = client.db().collection('links')
      const linkInfo = await links.findOne({shortUrl: shortUrl})
      if (linkInfo) {
        res.status(301).redirect(linkInfo.originalUrl)
      } else {
        res.status(404).send('Link not found')
      }
    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = mongoHandler