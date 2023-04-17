import express from 'express'
import * as views from './views'

export function app_start(port: string) {
  const app = express()


  app.get('/', (req, res) => {
    res.send(views.home())
  })

  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
}
