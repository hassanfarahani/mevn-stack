import express from 'express'
const app = express()
import { registerRoutes } from './routes'
import { setEnvironment } from './config/env.js'
import { connectToDB } from './config/db.js'
const port = process.env.PORT || 3000

setEnvironment(app)
connectToDB()
registerRoutes(app)

app.get('/', (req, res) => {
  if (process.env.NODE_ENV !== 'production') {
    return res.send('Running server in development mode.')
  } else {
    return res.sendFile('index.html', { root: `${__dirname}/../dist/`})
  }
})

app.listen(port, () => {
  console.log(`MEVN app listening on port ${port} ${process.env.NODE_ENV} mode!`)
})