const express = require("express")
const cors = require("cors")

const port = 8000
const app = express()

app.use(cors())
app.use(express.json())

app.listen(port, () => {
  console.log('Server was start on port: ' + port)
})