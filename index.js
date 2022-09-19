import cors from 'cors'
import fetch from 'node-fetch'
import express from 'express'
import bodyParser from 'body-parser'
//const dns = require('dns')
//const hostname = 'geo.by'
//const cors = require('cors')
const PORT = 4000
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
app.post('/getaddress', async (req, res) => {
  let ip =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress

  const response = await fetch(
    `https://geocode-maps.yandex.ru/1.x/?apikey=574b466d-bfe4-4fc1-bee6-0c6047cb4a98&geocode=${req.body.long},${req.body.lat}&format=json`,
    {
      method: 'get',
    },
  )
  const data = await response.json()
  res.send({
    ip: ip.split(':').pop(),
    data,
  })
})

/*dns.resolve(hostname, (err, addresses) => {
  if (err) {
    console.log('error')
  }
  console.log(addresses)
})*/
